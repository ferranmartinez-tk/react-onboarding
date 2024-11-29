import { Link } from 'react-router';
import { Dropdown, DropdownOption } from '../components/Dropdown';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { getIngredients, getRecipe, postRecipe, putRecipe  } from '../api/recipes';
import { getUsers } from '../api/users';
import { Ingredient, Recipe } from '../types/Recipe';
import { User } from '../types/Users';
import { useParams } from "react-router";
import { CREATE_RECIPE_ID } from '../config';

import './EditRecipe.css';

export const EditRecipe = () => {
    const [recipe, setRecipe] = useState<Recipe>({
        name: "",
        authorID: "",
        ingredients: [],
    });
    const [users, setUsers] = useState<DropdownOption[]>([]);
    const [ingredients, setIngredients] = useState<DropdownOption[]>([]);

    let { recipeID } = useParams() as { recipeID: string };
    const navigate = useNavigate();

    const viewTitle = recipeID === CREATE_RECIPE_ID ? "Create Recipe" : "Edit Recipe"; 

    useEffect(() => {
        const fetchRecipe = async (recipeID: string) => {
            const recipeAPIResponse = await getRecipe(recipeID);
            setRecipe(recipeAPIResponse);
        };

        const fetchUsers = async () => {
            const usersAPIResponse = await getUsers();
            const usersForDropdown: DropdownOption[] = usersAPIResponse.map((user: User) => { 
                return { 
                    key: user.id, 
                    value: user.name
                }
            });
            setUsers(usersForDropdown);
            if (recipeID === CREATE_RECIPE_ID) {
                setRecipe({...recipe, authorID: usersForDropdown[0].key});
            }
        };

        const fetchIngredients = async () => {
            const ingredientsAPIResponse = await getIngredients();
            const ingredientsForDropdown: DropdownOption[] = ingredientsAPIResponse.map(
                (ingredient: Ingredient) => { 
                    return {
                        key: ingredient.id, 
                        value: ingredient.name
                    }
                }
            );
            setIngredients(ingredientsForDropdown);
        };

        fetchUsers();
        fetchIngredients();
        if (recipeID !== CREATE_RECIPE_ID) {
            fetchRecipe(recipeID);
        }
    }, [recipeID]);

    const onSaveButtonClick = async () => {
        if (recipeID === CREATE_RECIPE_ID) {
            await postRecipe(recipe);
        } else {
            await putRecipe(recipeID, recipe);
        };

        navigate("/");
    };

    const removeIngredient = (ingredientIndex: number) => {
        const newIngredients = recipe.ingredients.filter((_, i: number) => (i !== ingredientIndex));
        setRecipe({...recipe, ingredients: newIngredients});
    };

    const changeIngredient = (ingredientIndex: number, ingredientID: string) => {
        const newIngredients = recipe.ingredients;
        newIngredients[ingredientIndex] = ingredientID; 
        setRecipe({...recipe, ingredients: newIngredients});
    };

    const addIngredient = () => {
        const newIngredients = recipe.ingredients;
        newIngredients.push(ingredients[0].key);
        setRecipe({...recipe, ingredients: newIngredients});
    };

    return (
        <div className="edit-recipes-view">
            <h3 className="edit-recipes-title">{viewTitle}</h3>
            <div className="edit-recipes-form">
                <div className="edit-recipes-form-item">
                    <label className="edit-recipes-form-item-label">Name</label>
                    <input 
                        type="text" 
                        value={recipe.name} 
                        onChange={(e) => setRecipe({...recipe, name: e.target.value})}
                    />
                </div>

                <div className="edit-recipes-form-item">
                    <label className="edit-recipes-form-item-label">Author</label>
                    <Dropdown 
                        value={recipe.authorID} 
                        options={users} 
                        onChange={(e) => setRecipe({...recipe, authorID: e.target.value})}
                    />
                </div>

                <div className="edit-recipes-form-item">
                    <label className="edit-recipes-form-item-label">Ingredients</label>
                    <button
                        onClick={() => addIngredient()}
                    >
                        Add Ingredient
                    </button>
                    {
                        recipe.ingredients.map((ingredient: string, ingredientIndex: number) => {
                            return (
                                <div key={ingredientIndex}>
                                    <Dropdown 
                                        value={ingredient} 
                                        options={ingredients} 
                                        onChange={(e) => changeIngredient(ingredientIndex, e.target.value)}
                                    /> 
                                    <button
                                        onClick={() => removeIngredient(ingredientIndex)}
                                    >
                                        Delete Ingredient
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
                
                <button
                    className="edit-recipes-save-button" 
                    onClick={onSaveButtonClick}
                >
                    Save
                </button>
                <button className="edit-recipes-cancel-button">
                    <Link className="edit-recipes-cancel-button-link" to="/">
                        Cancel
                    </Link>
                </button>
            </div>
        </div>
    );
}