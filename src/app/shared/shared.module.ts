import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertComponent} from "./alert/alert.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {SpinnerComponent} from "./spinner/spinner.component";
import {DropdownDirective} from "./dropdown.directive";


@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    SpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    PlaceholderDirective,
    SpinnerComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}
