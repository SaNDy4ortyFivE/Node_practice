import { Request, Response, NextFunction } from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    console.log('checking auth middleware');
    next();
    // res.status(401).send('error');
};
