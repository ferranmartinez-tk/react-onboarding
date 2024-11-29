import { Loading } from "../components/common/Loading";
import { useState } from "react";
import { useNavigate } from "react-router";
import { postRecipe } from "../api/recipes";
import { Recipe } from "../types/Recipe";
import { RecipeForm } from "./RecipeForm";

import "./EditRecipe.css";

export const CreateRecipe = () => {
  const defaultRecipe = {
    name: "",
    authorID: "",
    ingredients: [],
  };
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSave = async (recipe: Recipe) => {
    setIsLoading(true);
    await postRecipe(recipe);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="edit-recipes-view">
      <h3 className="edit-recipes-title">Create Recipe</h3>

      <div className="edit-recipes-form">
        <Loading isLoading={isLoading}>
          <RecipeForm recipe={defaultRecipe} onSave={onSave} />
        </Loading>
      </div>
    </div>
  );
};
