import { Request, Response, NextFunction } from 'express';

export const verifySecretKey = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = process.env.SECRET_KEY; // Se obtiene la clave secreta de las variables de entorno 
    const requestKey = req.headers['x-secret-key'] || req.query.secret; // Se obtiene la clave proporcionada en la solicitud.

    if (requestKey && secretKey === requestKey) { // Se compara la clave proporcionada con la clave secreta
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid secret key' }); // Se responde con un error 401.
    }
};
