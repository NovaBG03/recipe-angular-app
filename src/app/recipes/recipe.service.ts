import {Injectable} from "@angular/core";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Potatoes',
      'Delicious potato dish',
      'https://www.tasteofhome.com/wp-content/uploads/2018/01/exps15817_PR15D03_03_1b-696x696.jpg',
      [
        new Ingredient('Potato', 3),
        new Ingredient('Butter', 1)
      ]
    ),
    new Recipe(
      'Ice Cream Cake',
      'Copycat dairy queen ice cream cake',
      'https://www.browneyedbaker.com/wp-content/uploads/2015/06/ice-cream-cake-24-600.jpg',
      [
        new Ingredient('Ice Cream', 2),
        new Ingredient('Cake', 1)
      ]
    )
  ];

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log(this.recipes);
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    console.log(id);
    console.log(this.recipes);
    this.recipesChanged.next(this.getRecipes())
  }
}
