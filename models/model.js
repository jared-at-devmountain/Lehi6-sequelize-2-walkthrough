import Sequelize, { DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize('postgresql:///recipe_app', { define: { underscored: true }})

class Ingredient extends Model {}
Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        units: {
            type: DataTypes.STRING(60),
            allowNull: false,
        }
    },
    {
        modelName: 'ingredient',
        sequelize: sequelize,
        timestamps: false
    }
)

class Author extends Model {}
Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(60),
            allowNull: false,
        }
    },
    {
        modelName: 'author',
        sequelize: sequelize,
        timestamps: false
    }
)

class Recipe extends Model {}
Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        modelName: 'recipe',
        sequelize: sequelize,
        timestamps: false
    }
)

class RecipeIngredient extends Model {}
RecipeIngredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        modelName: 'recipe_ingredient',
        sequelize: sequelize,
        timestamps: false
    }
)

Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipeId' });
RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipeId' });

Ingredient.hasMany(RecipeIngredient, { foreignKey: 'ingredientId' });
RecipeIngredient.belongsTo(Ingredient, { foreignKey: 'ingredientId' });

Author.hasMany(Recipe, { foreignKey: 'authorId' });
Recipe.belongsTo(Author, { foreignKey: 'authorId' });

await sequelize.sync({ force: true })
await sequelize.close()