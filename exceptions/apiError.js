class ApiError extends Error {
    status;

    errors;

    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static UserNotFound() {
        return new ApiError(404, 'User not found');
    }
}

module.exports = ApiError;
