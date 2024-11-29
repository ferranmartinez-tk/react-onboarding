export type Ingredient = {
    name: string,
    id: string
};

export type RecipeListItem = {
    id: string,
    name: string,
    authorID: string
};

export type Recipe = {
    id?: string,
    name: string,
    authorID: string,
    ingredients: string[]
};