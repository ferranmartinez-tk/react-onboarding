import { BACKEND_URL } from "../config";
import { Recipe, RecipeListItem, Ingredient } from "../types/Recipe";
import {
  RecipeSchema,
  RecipeListItemSchema,
  RecipesSchema,
  IngredientSchema,
  IngredientsSchema,
  RecipeUpdateSchema,
} from "./types/recipes";

const RECIPES_URL = BACKEND_URL + "/recipes";
const INGREDIENTS_URL = BACKEND_URL + "/ingredients";

export const postRecipe = async (newRecipe: Recipe): Promise<Recipe> => {
  try {
    const recipePayload: RecipeUpdateSchema = {
      name: newRecipe.name,
      author_id: newRecipe.authorID,
      ingredients: newRecipe.ingredients,
    };
    const response = await fetch(RECIPES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipePayload),
    });
    const data: RecipeSchema = await response.json();
    const recipe: Recipe = {
      id: data.id,
      name: data.name,
      authorID: data.author_id,
      ingredients: data.ingredients.map(
        (ingredient: IngredientSchema) => ingredient.id
      ),
    };
    return recipe;
  } catch (exception) {
    throw Error(`Error calling POST METHOD on: ${RECIPES_URL} ` + exception);
  }
};

export const getRecipes = async (): Promise<RecipeListItem[]> => {
  try {
    const response = await fetch(RECIPES_URL);
    const data: RecipesSchema = await response.json();
    const recipes: RecipeListItem[] = data.recipes.map(
      (recipe: RecipeListItemSchema) => ({
        id: recipe.id,
        name: recipe.name,
        authorID: recipe.author_id,
      })
    );
    return recipes;
  } catch (exception) {
    throw Error(`Error calling GET METHOD on: ${RECIPES_URL} ` + exception);
  }
};

export const getRecipe = async (recipeID: string): Promise<Recipe> => {
  const getRecipeURL = RECIPES_URL + `/${recipeID}`;
  try {
    const response = await fetch(getRecipeURL);
    const data: RecipeSchema = await response.json();
    const recipe: Recipe = {
      id: data.id,
      name: data.name,
      authorID: data.author_id,
      ingredients: data.ingredients.map(
        (ingredient: IngredientSchema) => ingredient.id
      ),
    };
    return recipe;
  } catch (exception) {
    throw Error(`Error calling GET METHOD on: ${RECIPES_URL} ` + exception);
  }
};

export const putRecipe = async (
  recipeID: string,
  newRecipe: Recipe
): Promise<Recipe> => {
  const putRecipeURL = RECIPES_URL + `/${recipeID}`;
  try {
    const recipePayload: RecipeUpdateSchema = {
      name: newRecipe.name,
      author_id: newRecipe.authorID,
      ingredients: newRecipe.ingredients,
    };
    const response = await fetch(putRecipeURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipePayload),
    });
    const data: RecipeSchema = await response.json();
    const recipe: Recipe = {
      name: data.name,
      authorID: data.author_id,
      ingredients: data.ingredients.map(
        (ingredient: IngredientSchema) => ingredient.id
      ),
    };
    return recipe;
  } catch (exception) {
    throw Error(`Error calling PUT METHOD on: ${putRecipeURL} ` + exception);
  }
};

export const deleteRecipe = async (recipeID: string) => {
  const deleteRecipeURL = RECIPES_URL + `/${recipeID}`;
  try {
    await fetch(deleteRecipeURL, {
      method: "DELETE",
    });
  } catch (exception) {
    throw Error(
      `Error calling DELETE METHOD on: ${deleteRecipeURL} ` + exception
    );
  }
};

export const getIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await fetch(INGREDIENTS_URL);
    const data: IngredientsSchema = await response.json();
    const ingredients: Ingredient[] = data.ingredients.map(
      (ingredient: IngredientSchema) => ({
        name: ingredient.name,
        id: ingredient.id,
      })
    );
    return ingredients;
  } catch (exception) {
    throw Error(`Error calling GET METHOD on: ${INGREDIENTS_URL} ` + exception);
  }
};
