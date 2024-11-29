import { Loading } from "../components/common/Loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getRecipe, putRecipe } from "../api/recipes";
import { Recipe } from "../types/Recipe";
import { useParams } from "react-router";

import "./EditRecipe.css";
import { RecipeForm } from "./RecipeForm";

export const EditRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    authorID: "",
    ingredients: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  let { recipeID } = useParams() as { recipeID: string };
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchRecipe = async (recipeID: string) => {
      const recipeAPIResponse = await getRecipe(recipeID);
      setRecipe(recipeAPIResponse);
    };

    fetchRecipe(recipeID);
    setIsLoading(false);
  }, [recipeID]);

  const onSave = async (recipe: Recipe) => {
    setIsLoading(true);
    if (!recipe.id) {
      throw Error("Recipe ID is missing");
    }
    await putRecipe(recipe.id, recipe);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="edit-recipes-view">
      <h3 className="edit-recipes-title">Edit Recipe</h3>

      <div className="edit-recipes-form">
        <Loading isLoading={isLoading}>
          <RecipeForm key={recipe?.id} recipe={recipe} onSave={onSave} />
        </Loading>
      </div>
    </div>
  );
};
