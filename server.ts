import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Bonjour, monde !');
});

const uri = process.env.DBNAME ; 

try {
    mongoose.connect(uri);
    console.log('Connexion à la base de données MongoDB réussie');
} catch (error) {
    console.error('Erreur lors de la connexion à la base de données MongoDB', error);
    }

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});