import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { router } from './Routes/image.routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Secret-Key']
}));

app.use('/go', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
