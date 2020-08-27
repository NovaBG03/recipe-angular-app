import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editingItemIndex: number;
  editingIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
      .subscribe(id => {
        this.editMode = true;
        this.editingItemIndex = id;
        this.editingIngredient = this.shoppingListService.getIngredient(id);
        this.ingredientForm.setValue({
          name: this.editingIngredient.name,
          amount: this.editingIngredient.amount
        })
      });
  }

  onSubmit() {
    const name = this.ingredientForm.value.name;
    const amount = this.ingredientForm.value.amount;
    const ingredient = new Ingredient(name, amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editingItemIndex ,ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.editingItemIndex = null;
    this.editingIngredient = null;
    this.ingredientForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
