const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const auth = {
    checkToken: (req, res, next) => {
        const bearerToken = req.headers.authorization;
        const jwtToken = bearerToken && bearerToken.split(' ')[1];
        if (!jwtToken) {
            const error = new AppError(401, 'No token available');
            return next(error);
        }
        const jwtPayload = jwt.verify(jwtToken, 'secretword');

        req.user = jwtPayload;
        console.log(req.user);
        next();
    },
    checkUserType: (userType, courierType) => (req, res, next) => {
        const user = req.user;
        console.log('user', user);
        
        const hasPermission = user.userType === userType || user.courierType === courierType;
        if (!hasPermission ) {
            const err = new AppError(
                403,
                'User has no needed permission to execute this operation'
            );
            return next(err);
        }
        next();
    },
};
module.exports = auth;
