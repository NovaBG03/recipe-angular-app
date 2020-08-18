import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe("Potatoes", "Delicious potato dish", "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps15817_PR15D03_03_1b-696x696.jpg"),
    new Recipe("Ice Cream Cake", "Copycat dairy queen ice cream cake", "https://www.browneyedbaker.com/wp-content/uploads/2015/06/ice-cream-cake-24-600.jpg")
  ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

}
