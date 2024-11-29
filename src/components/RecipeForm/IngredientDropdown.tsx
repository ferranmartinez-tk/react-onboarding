import { Dropdown } from "../common/Dropdown";
import { Loading } from "../common/Loading";
import { useIngredients } from "../../hooks/ManageIngredient";
import { useEffect } from "react";

type Props = {
  ingredient: string;
  changeIngredient: (ingredientID: string) => void;
};

export const IngredientDropdown = ({ ingredient, changeIngredient }: Props) => {
  const [ingredients, isLoading] = useIngredients();

  useEffect(() => {
    changeIngredient(ingredients[0]?.key);
  }, [ingredients]);

  return (
    <Loading isLoading={isLoading}>
      <Dropdown
        value={ingredient}
        options={ingredients}
        onChange={(e) => changeIngredient(e.target.value)}
      />
    </Loading>
  );
};
