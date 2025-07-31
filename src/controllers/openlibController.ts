import { Request, Response, NextFunction } from 'express';
import { searchBooks } from '../middlewares/openlib';

// Search by Book Title
export const searchByTitle = (req: Request, res: Response, next: NextFunction) => {
    try {
        const title = req.params.q;
        console.log(req.body);
        const books = [];
        // books = searchBooks(title);
        searchBooks(title);
        // res.json(books);
    } catch (error) {
        next(error);
    }
};

// Search by Book ISBN
export const searchByIsbn = (req: Request, res: Response, next: NextFunction) => {
};