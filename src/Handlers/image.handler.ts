import { Request, Response } from 'express';
import { addTextToImage } from '../Controllers/image.controller';

export const addTextToImageHandler = async (req: Request, res: Response) => {
  try {
    const { text } = req.body as { text: string };
    if (!text) {
        return res.status(400).json({ message: "Text parameter is required." });
    }
    
    const imageBuffer = await addTextToImage(text);

    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'Unknown error occurred' });
    }
  }
};
