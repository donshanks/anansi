// src/config/sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/devdb.sqlite'
});

export default sequelize;