import { Request, Response, NextFunction } from 'express';
import Book from '../models/book';

// Create an book
export const createBook = (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { name } = req.body;
    //         const newBook: book = { id: Date.now(), name };
    //         res.status(201).json(newBook);
    //     } catch (error) {
    //         next(error);
    //     }
};

// Read all books
export const getBooks = (req: Request, res: Response, next: NextFunction) => {
    try {
        let books = Book.findAll()
        res.json(books);
    } catch (error) {
        next(error);
    }
};

// Read single book
export const getBookById = (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const id = parseInt(req.params.id, 10);
    //         const book = books.find((i) => i.id === id);
    //         if (!book) {
    //             res.status(404).json({ message: 'book not found' });
    //             return;
    //         }
    //         res.json(book);
    //     } catch (error) {
    //         next(error);
    //     }
};

// Update an book
export const updateBook = (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const id = parseInt(req.params.id, 10);
    //         const { name } = req.body;
    //         const bookIndex = books.findIndex((i) => i.id === id);
    //         if (bookIndex === -1) {
    //             res.status(404).json({ message: 'book not found' });
    //             return;
    //         }
    //         books[bookIndex].name = name;
    //         res.json(books[bookIndex]);
    //     } catch (error) {
    //         next(error);
    //     }
};

// Delete an book
export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const id = parseInt(req.params.id, 10);
    //         const bookIndex = books.findIndex((i) => i.id === id);
    //         if (bookIndex === -1) {
    //             res.status(404).json({ message: 'book not found' });
    //             return;
    //         }
    //         const deletedBook = books.splice(bookIndex, 1)[0];
    //         res.json(deletedBook);
    //     } catch (error) {
    //         next(error);
    //     }
};