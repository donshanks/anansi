import express from 'express';

import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middlewares/errorHandler';
// import { createBookModel } from './models/book';
// import { createAuthorModel } from './models/author';

const app = express();
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;