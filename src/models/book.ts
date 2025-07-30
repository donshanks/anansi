import {
    Model,
    Optional,
    DataTypes,
    Sequelize,
} from 'sequelize';

interface BookAttributes {
    id: string;
    isbn: string;
    title: string;
    openLibraryId: string;
    openLibraryCoverId: string;
    openLibraryBookUrl: string;
    numPages: number;
    pubDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface BookCreationAttrbutes extends Optional<BookAttributes, 'id'> { }

class Book extends Model<BookAttributes, BookCreationAttrbutes> implements BookAttributes {
    public id!: string;
    public isbn!: string;
    public title!: string;
    public openLibraryId!: string;
    public openLibraryCoverId!: string;
    public openLibraryBookUrl!: string;
    public numPages!: number;
    public pubDate!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function createBookModel(sequelize: Sequelize): typeof Book {
    Book.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        openLibraryId: {
            type: DataTypes.STRING,
        },
        openLibraryCoverId: {
            type: DataTypes.STRING,
        },
        openLibraryBookUrl: {
            type: DataTypes.STRING,
        },
        numPages: {
            type: DataTypes.INTEGER,
        },
        pubDate: {
            type: DataTypes.DATE,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    }, {
        sequelize
    });
    return Book;
}
