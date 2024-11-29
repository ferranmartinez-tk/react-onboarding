
export type IngredientSchema = {
    id: string;
    name: string;
};

export type IngredientsSchema = {
    ingredients: IngredientSchema[];
};

export type RecipeSchema = {
    id: string;
    name: string;
    author_id: string;
    author_name: string;
    ingredients: IngredientSchema[];
};

export type RecipeListItemSchema = {
    id: string;
    name: string;
    author_id: string;
};

export type RecipesSchema = {
    recipes: RecipeListItemSchema[];
};

export type RecipeUpdateSchema = {
    author_id: string;
    name: string;
    ingredients: string[];
};
