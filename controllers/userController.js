const { User } = require('../db/models');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/apiError');

// handles GET /api/v1/users
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// handles POST /api/v1/users
module.exports.createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, age, isFree } = req.body;

        const newUser = await User.create({
            firstName,
            lastName,
            age,
            isFree,
        });

        const userData = new UserDto(newUser);

        // respond with status code 201 - successfully created
        res.status(201).json(userData);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// handles GET /api/v1/users/:id
module.exports.getUser = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id, 10);

        const user = await User.findByPk(id);
        if (!user) throw ApiError.UserNotFound();

        const userData = new UserDto(user);

        res.json(userData);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// handles PUT /api/v1/users/:id
module.exports.replaceUser = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        const { firstName, lastName, age, isFree } = req.body;

        // we search for an entry in database and create one if it doesn't exist
        // variable created has a boolean value true if entry was created and false if it existed
        const [user, created] = await User.findOrCreate({
            where: { id },
            defaults: { firstName, lastName, age, isFree },
        });

        // respond with status code 201 if entry was newly created
        if (created) return res.status(201).send('New user has been created');

        // const candidate = await User.findByPk(id);
        // if (!candidate) throw ApiError.UserNotFound();

        user.set({
            firstName,
            lastName,
            age,
            isFree,
        });
        await user.save();

        // respond with status OK when existing user is replaced
        res.status(200).send('Entry modification was successfull');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// handles PATCH /api/v1/users/:id
module.exports.updateUser = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        const candidate = await User.findByPk(id);
        if (!candidate) throw ApiError.UserNotFound;

        // let's get nececssary values from req.body
        const { firstName, lastName, age, isFree } = req.body;

        // let's create an object with retrieved values
        const reqBody = { firstName, lastName, age, isFree };

        // let's remove any null or undefined values if there are any
        Object.keys(reqBody).forEach((key) => {
            if (reqBody[key] === null || reqBody[key] === undefined) delete reqBody[key];
        });

        // now we check if we had any valid values provided
        if (!Object.keys(reqBody)[0]) throw ApiError.BadRequest('No valid value has been provided');

        // now we update a user with valid values
        candidate.set(reqBody);
        await candidate.save();

        const userData = new UserDto(candidate);
        res.json(userData);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// handles DELETE /api/v1/users/:id
module.exports.deleteUser = async (req, res, next) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        const success = await User.destroy({ where: { id } });

        // destroy method returns 1 if query was successfull and 0 if it's not
        if (!success) throw ApiError.UserNotFound();

        res.status(200).send('User has been deleted successfully');
    } catch (error) {
        console.error(error);
        next(error);
    }
};
