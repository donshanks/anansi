import { Router } from 'express';
import {
    searchByTitle,
    searchByIsbn,
    getEditionsOfWork
} from '../controllers/openlibController'

const router = Router();

router.get('/title', searchByTitle);
router.get('/isbn', searchByIsbn);
router.get('/editions', getEditionsOfWork);

export default router;
