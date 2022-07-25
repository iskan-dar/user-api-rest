const ApiError = require('../exceptions/apiError');

module.exports.checkUserValues = (req, res, next) => {
    const { firstName, lastName } = req.body;

    if (!firstName) {
        return next(ApiError.BadRequest('Please, make sure firstname property has a valid value'));
    }

    if (!lastName) {
        return next(ApiError.BadRequest('Please, make sure lastName property has a valid value'));
    }

    const age = Number.parseInt(req.body.age, 10);
    if (Number.isNaN(age)) {
        return next(ApiError.BadRequest('Please, make sure age property has a valid value'));
    }

    next();
};

module.exports.checkID = (req, res, next) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return next(ApiError.BadRequest('Provide a valid ID, please'));
    }

    next();
};

module.exports.checkIsFreeValue = (req, res, next) => {
    const { isFree } = req.body;
    if (typeof isFree !== 'boolean') {
        return next(ApiError.BadRequest('Provide a valid isFree value to make a complete PUT request'));
    }

    next();
};
