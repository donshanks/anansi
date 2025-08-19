import { Request, Response, NextFunction } from 'express';
import {
    getBookList,
    getBookByISBN,
    getEditionsByWorkID,
    OpenLibBook,
    OpenLibBookEdition
} from '../middlewares/openlib';
import { runInNewContext } from 'vm';

// Search by Book Title
export const searchByTitle = async (req: Request, res: Response, next: NextFunction) => {
    const olBookListData = await getBookList(`${req.query.q}`, `${req.query.limit}`);
    let books: OpenLibBook[] = [];

    for (let i = 0; i < olBookListData.length; i++) {
        books.push(new OpenLibBook(olBookListData[i]));
    }

    let searchResponse = {
        timestamp: new Date().toISOString(),
        function: 'searchByTitle',
        params: req.query,
        docs: books
    }
    res.json(searchResponse);
};

// Search by Book ISBN
export const searchByIsbn = async (req: Request, res: Response, next: NextFunction) => {
    const olBookData: OpenLibBook = await getBookByISBN(`${req.query.q}`);

    let searchResponse = {
        timestamp: new Date().toISOString(),
        function: 'searchByIsbn',
        params: req.query,
        data: olBookData,
    }
    res.json(searchResponse);
};

// Get a list of editions of a work
export const getEditionsOfWork = async (req: Request, res: Response, next: NextFunction) => {
    const olWorkData = await getEditionsByWorkID(`${req.query.olid}`);
    let editions: OpenLibBookEdition[] = [];

    for (let i = 0; i < olWorkData.length; i++) {
        editions.push(new OpenLibBookEdition(olWorkData[i]));
    }

    let searchResponse = {
        timestamp: new Date().toISOString(),
        function: 'getEditionsByWork',
        params: req.query,
        docs: editions
    }

    res.json(searchResponse);
}
