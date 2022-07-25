const ApiError = require('../exceptions/apiError');

module.exports = function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message });
    }

    return res
        .status(500).json({ message: 'Server could not handle the request' });
};
