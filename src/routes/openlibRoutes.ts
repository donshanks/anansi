import { Router } from 'express';
import {
    searchByTitle,
    searchByIsbn
} from '../controllers/openlibController'

const router = Router();

router.get('/title', searchByTitle);
router.get('/isbn', searchByIsbn);

export default router;
