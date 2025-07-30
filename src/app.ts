import express from 'express';
import { Sequelize } from 'sequelize';

// import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/devdb.sqlite'
})

// Routes
// app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;