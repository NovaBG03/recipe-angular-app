import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() showRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("Potatoes", "Delicious potato dish", "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps15817_PR15D03_03_1b-696x696.jpg"),
    new Recipe("Ice Cream Cake", "Copycat dairy queen ice cream cake", "https://www.browneyedbaker.com/wp-content/uploads/2015/06/ice-cream-cake-24-600.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(selectedRecipe: Recipe) {
    this.showRecipe.emit(selectedRecipe);
  }
}
