import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

import {Ingredient} from "../../shared/ingredient.model";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromApp from  "../../store/app.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editingIngredient: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select("shoppingList")
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editingIngredient = stateData.editedIngredient;
          this.ingredientForm.setValue({
            name: this.editingIngredient.name,
            amount: this.editingIngredient.amount
          })
        } else {
          this.editMode = false;
        }
      })
  }

  onSubmit() {
    const name = this.ingredientForm.value.name;
    const amount = this.ingredientForm.value.amount;
    const ingredient = new Ingredient(name, amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient))
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.resetForm();
  }

  deleteSelectedItem() {
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
      this.resetForm();
    }
  }

  resetForm() {
    this.editMode = false;
    this.editingIngredient = null;
    this.ingredientForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }
}
