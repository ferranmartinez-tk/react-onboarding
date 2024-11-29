import { DropdownOption } from "../components/common/Dropdown";
import { useState } from "react";
import { getIngredients } from "../api/recipes";
import { useEffect } from "react";
import { Ingredient } from "../types/Recipe";

export const useIngredients = (): [DropdownOption[], boolean] => {
  const [ingredients, setIngredients] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIngredients = async () => {
    const ingredientsAPIResponse = await getIngredients();
    const ingredientsForDropdown: DropdownOption[] = ingredientsAPIResponse.map(
      (ingredient: Ingredient) => {
        return {
          key: ingredient.id,
          value: ingredient.name,
        };
      }
    );
    setIngredients(ingredientsForDropdown);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchIngredients();
    setIsLoading(false);
  }, []);

  return [ingredients, isLoading];
};
