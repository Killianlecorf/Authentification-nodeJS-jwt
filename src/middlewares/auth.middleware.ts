import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

interface DecodedToken {
  userId: string;
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Vérifier si le jeton d'authentification est présent dans l'en-tête de la requête
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authentification requise.' });
    }

    // Vérifier et décoder le jeton d'authentification
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    // Vérifier si l'utilisateur associé au jeton existe
    const user = User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé.' });
    }

    // Ajouter l'utilisateur au corps de la requête pour une utilisation ultérieure
    req.user = user;

    // Poursuivre l'exécution de la prochaine fonction middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Jeton d\'authentification invalide.' });
  }
};