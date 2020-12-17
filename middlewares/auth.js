const { verify } = require('jsonwebtoken');

module.exports = (req, _, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const err = new Error();
        err.statusCode = 401;
        err.message = 'Invalid Credential';
        throw err;
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = verify(token, 'ja-ja-k-km-kr');
    req.userId = decodedToken.userId;
    next();
}