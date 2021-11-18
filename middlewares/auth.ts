import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No Token, Authorization Denied!' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded, decoded.user);
        req.body.userId = decoded.user.id;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not Valid!' });
    }
};
