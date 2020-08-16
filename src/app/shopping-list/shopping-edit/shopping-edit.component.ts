import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredientCreated = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  onCreateNewIngredient(amountInput: HTMLInputElement) {
    const name = this.nameInputRef.nativeElement.value;
    const amount = amountInput.valueAsNumber;
    const ingredient = new Ingredient(name, amount);
    this.newIngredientCreated.emit(ingredient);
  }
}
