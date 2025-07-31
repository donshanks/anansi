import {
    Model,
    Optional,
    DataTypes,
} from 'sequelize';
import sequelize from '../config/sequelize';

interface AuthorAttributes {
    id: string;
    fullname: string;
    openLibraryAuthorId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthorCreationAttrbutes extends Optional<AuthorAttributes, 'id'> { }

class Author extends Model<AuthorAttributes, AuthorCreationAttrbutes> implements AuthorAttributes {
    public id!: string;
    public fullname!: string;
    public openLibraryAuthorId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Author.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openLibraryAuthorId: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'authors',
    sequelize
});

export default Author;