import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe..service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onToShoppingList() {
    this.RecipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
