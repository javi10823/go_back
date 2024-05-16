import { Request, Response } from 'express';
import { addTextToImage } from '../Controllers/image.controller';

export const addTextToImageHandler = async (req: Request, res: Response) => {
  try {
    const text = req.query.text as string; // Se obtiene el texto desde los parámetros de consulta de la solicitud.
    if (!text) { // Si no se proporciona el texto, se responde con un error 400.
        return res.status(400).json({ message: "Text parameter is required." });
    }
    
    const imageBuffer = await addTextToImage(text); // Se llama a addTextToImage para procesar la imagen con el texto.

    res.set("Content-Type", "image/png"); // Se configura el encabezado Content-Type a 'image/png'
    res.send(imageBuffer); // Se envía la imagen procesada.
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unknown error occurred' });
    }
  }
};
