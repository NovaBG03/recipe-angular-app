import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";


import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.getRecipes())
  }
}
