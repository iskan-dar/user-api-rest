module.exports = class UserDto {
    firstName;

    lastName;

    age;

    isFree;

    createdAt;

    upDatedAt;

    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.age = user.age;
        this.isFree = user.isFree;
        this.createdAt = user.createdAt;
        this.upDatedAt = user.updatedAt;
    }
};
