const generateError = (statusCode = 500, message = 'Internal Server error', data) => {
    const err = new Error();
    err.statusCode = statusCode;
    err.message = message;
    if (data) err.data = data;
    throw err;
}

module.exports = generateError;