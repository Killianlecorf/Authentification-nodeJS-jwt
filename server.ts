import express, { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Bonjour, monde !');
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});