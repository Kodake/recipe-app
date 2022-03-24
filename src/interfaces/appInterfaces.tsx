export interface Recipes {
    recipes: Recipe[];
}

export interface Recipe {
    id:          string;
    title:       string;
    ingredients: string[];
    method:      string;
    cookingTime: string;
}