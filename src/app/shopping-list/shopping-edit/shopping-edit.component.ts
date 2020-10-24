import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editingItemId: number;
  editingIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
      .subscribe(id => {
        this.editMode = true;
        this.editingItemId = id;
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
      this.shoppingListService.updateIngredient(this.editingItemId, ingredient);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.editingItemId = null;
    this.editingIngredient = null;
    this.ingredientForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteSelectedItem() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editingItemId);
      this.resetForm();
    }
  }
}
