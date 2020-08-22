import {Subject} from "rxjs";

import {Ingredient} from "../shared/ingredient.model";

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Potatoes', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.getIngredients());
  }
}
