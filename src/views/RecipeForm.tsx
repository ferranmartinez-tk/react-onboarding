import { Recipe } from "../types/Recipe";
import { useState } from "react";
import { Link } from "react-router";
import { IngredientDropdown } from "../components/RecipeForm/IngredientDropdown";
import { UsersDropdown } from "../components/RecipeForm/UsersDropdown";

type Props = {
  recipe: Recipe;
  onSave: (recipe: Recipe) => void;
};

export const RecipeForm = ({ recipe, onSave }: Props) => {
  const [innerRecipe, setInnerRecipe] = useState<Recipe>(recipe);

  const removeIngredient = (ingredientIndex: number) => {
    const newIngredients = innerRecipe.ingredients.filter(
      (_, i: number) => i !== ingredientIndex
    );
    setInnerRecipe({ ...innerRecipe, ingredients: newIngredients });
  };

  const changeIngredient = (ingredientIndex: number, ingredientID: string) => {
    const newIngredients = innerRecipe.ingredients;
    newIngredients[ingredientIndex] = ingredientID;
    setInnerRecipe({ ...innerRecipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    const newIngredients = innerRecipe.ingredients;
    newIngredients.push("");
    setInnerRecipe({ ...innerRecipe, ingredients: newIngredients });
  };

  const changeUserID = (userID: string) => {
    setInnerRecipe({ ...innerRecipe, authorID: userID });
  };

  return (
    <>
      <div className="edit-recipes-form-item">
        <label className="edit-recipes-form-item-label">Name</label>
        <input
          type="text"
          value={innerRecipe.name}
          onChange={(e) =>
            setInnerRecipe({ ...innerRecipe, name: e.target.value })
          }
        />
      </div>

      <div className="edit-recipes-form-item">
        <label className="edit-recipes-form-item-label">Author</label>
        <UsersDropdown
          userID={innerRecipe.authorID}
          changeUserID={changeUserID}
        />
      </div>

      <div className="edit-recipes-form-item">
        <label className="edit-recipes-form-item-label">Ingredients</label>
        <button
          className="edit-recipes-form-add-ingredient-button"
          onClick={() => addIngredient()}
        >
          Add
        </button>
        {innerRecipe.ingredients.map(
          (ingredient: string, ingredientIndex: number) => {
            return (
              <div
                className="edit-recipes-form-ingredient-item"
                key={ingredientIndex}
              >
                <IngredientDropdown
                  ingredient={ingredient}
                  changeIngredient={(ingredientID: string) =>
                    changeIngredient(ingredientIndex, ingredientID)
                  }
                />
                <button
                  className="edit-recipes-form-delete-ingredient-button"
                  onClick={() => removeIngredient(ingredientIndex)}
                >
                  Delete Ingredient
                </button>
              </div>
            );
          }
        )}
      </div>
      <button
        className="edit-recipes-save-button"
        onClick={() => onSave(innerRecipe)}
      >
        Save
      </button>
      <button className="edit-recipes-cancel-button">
        <Link className="edit-recipes-cancel-button-link" to="/">
          Cancel
        </Link>
      </button>
    </>
  );
};
