import {
    Model,
    Optional,
    DataTypes,
    Sequelize,
} from 'sequelize';

interface AuthorAttributes {
    id: string;
    fullname: string;
    openLlibraryAuthorId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface AuthorCreationAttrbutes extends Optional<AuthorAttributes, 'id'> { }

class Author extends Model<AuthorAttributes, AuthorCreationAttrbutes> implements AuthorAttributes {
    public id!: string;
    public fullname!: string;
    public openLlibraryAuthorId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function createAuthorModel(sequelize: Sequelize): typeof Author {
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
        openLlibraryAuthorId: {
            type: DataTypes.STRING,
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
    return Author;
}