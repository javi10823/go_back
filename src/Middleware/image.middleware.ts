import { Request, Response, NextFunction } from 'express';

export const verifySecretKey = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = process.env.SECRET_KEY;
    const requestKey = req.headers['x-secret-key'] || req.query.secret;

    if (requestKey && secretKey === requestKey) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid secret key' });
    }
};
