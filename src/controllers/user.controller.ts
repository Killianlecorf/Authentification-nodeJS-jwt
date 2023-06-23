import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user.model';

// GET /users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

// GET /users/:id
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
};

// POST /users
export const createUser = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  try {
    const user = new User(userData);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
};


// PUT /users/:id
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userData: IUser = req.body;
    try {
      const user = await User.findByIdAndUpdate(userId, userData, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
    }
  };
  
  // DELETE /users/:id
  export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
    }
  };


//   export const authenticateUserController = (req: Request, res: Response, next: NextFunction) => {
//     // Ici, vous pouvez ajouter votre logique d'authentification, par exemple,
//     // en vérifiant si l'utilisateur a un jeton d'authentification valide dans l'en-tête de la requête.
//     // Si l'authentification échoue, vous pouvez envoyer une réponse d'erreur appropriée.
  
//     const authToken = req.headers.authorization;
//     if (!authToken) {
//       return res.status(401).json({ error: 'Authentification requise.' });
//     }
//     if (authToken !== 'dummy_token') {
//       return res.status(401).json({ error: 'Jeton d\'authentification invalide.' });
//     }
  
//     next();
//   };