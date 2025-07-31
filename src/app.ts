import express from 'express';

import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';
import openlibRoutes from './routes/openlibRoutes';

import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/search', openlibRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;