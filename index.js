import express from 'express'
import ViteExpress from 'vite-express'
import { Author, Recipe, Ingredient, RecipeIngredient } from './models/model.js'

const app = express()

app.use(express.json())

app.get('/recipes', async (req, res) => {
    //get all the recipe objects, put them in an array
    const recipeArray = await Recipe.findAll()

    //for each recipe object
    for (let i = 0; i < recipeArray.length; i++) {
        let recipe = recipeArray[i]

        //get all the recipe_ingredient entries associted with this recipe, and put them in an array
        let recipeIngredientsArray = await recipe.getRecipe_ingredients()

        //make an array to hold my ingredients when I get them
        let ingredients = []

        //for each recipe_ingredient entry associated with the current recipe
        for (let k = 0; k < recipeIngredientsArray.length; k++) {
            let recipeIngredient = recipeIngredientsArray[k]

            //get the ingredient associated with this recipe_ingredient entry
            let ingredient = await recipeIngredient.getIngredient()

            //make sure to add the quantity to the ingredient!
            ingredient.dataValues.quantity = recipeIngredient.dataValues.quantity

            //add it to my ingredients array for this recipe
            ingredients.push(ingredient.dataValues) 
        }

        //then finally, now that I have all of the ingredients associated with this recipe,
        //make the ingredients part of the recipe data
        recipeArray[i].dataValues.ingredients = ingredients
    }

    res.send(recipeArray)
})

ViteExpress.listen(app, 8372, () => {
    console.log('app is up on 8372')
})