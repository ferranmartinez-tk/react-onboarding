import Recipe from '../components/Recipe';
import { RecipeListItem as RecipeListItemType } from '../types/Recipe';
import { useState, useEffect } from 'react';

import { getRecipes, deleteRecipe } from '../api/recipes';
import { Link } from 'react-router';

import './ListRecipes.css';

export const ListRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeListItemType[]>([]);

    useEffect(() => {
      const fetchRecipes = async () => {
        const recipesAPIResponse = await getRecipes();
        setRecipes(recipesAPIResponse);
      }
      fetchRecipes();
    }, []);

    const onDeleteButtonClick = (recipeID: string) => {
        deleteRecipe(recipeID);
        const newRecipes = recipes.filter((recipe) => recipe.id !== recipeID);
        setRecipes(newRecipes);
    };

    return (
        <div className="recipe-list-main">
            <div className="recipe-list-div-title">
                <h3 className="recipe-list-title">Recipes list</h3>
                <button className="button-recipe-create">
                    <Link className="button-recipe-create-link" to="/edit/new">
                        Create recipe
                    </Link>
                </button>
            </div>

            {
                recipes.map((recipe) => (
                    <Recipe
                        key={recipe.id}
                        name={recipe.name}
                        id={recipe.id}
                        onDelete={onDeleteButtonClick}
                    />
                ))
            }
        </div>
    );
};