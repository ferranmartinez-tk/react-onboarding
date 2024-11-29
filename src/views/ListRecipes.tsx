import Recipe from '../components/Recipe';
import { Loading } from '../components/Loading';
import { RecipeListItem as RecipeListItemType } from '../types/Recipe';
import { useState, useEffect } from 'react';

import { getRecipes, deleteRecipe } from '../api/recipes';
import { Link } from 'react-router';

import './ListRecipes.css';

export const ListRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeListItemType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchRecipes = async () => {
        setIsLoading(true);
        const recipesAPIResponse = await getRecipes();
        setRecipes(recipesAPIResponse);
        setIsLoading(false);
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
                <button disabled={isLoading} className="button-recipe-create">
                    <Link className="button-recipe-create-link" to="/edit/new">
                        Create recipe
                    </Link>
                </button>
            </div>
            <Loading isLoading={isLoading}>
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
            </Loading> 
        </div>
    );
};