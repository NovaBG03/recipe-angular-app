import {Ingredient} from "../shared/ingredient.model";

const initialState = {
  ingredients: [
    new Ingredient('Potatoes', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action) {

}
