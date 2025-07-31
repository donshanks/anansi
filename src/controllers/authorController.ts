import { Request, Response, NextFunction } from 'express';
import Author from '../models/author';

// Read all authors
export const getAuthors = (req: Request, res: Response, next: NextFunction) => {
    try {
        let authors = Author.findAll()
        res.json(authors);
    } catch (error) {
        next(error);
    }
};