import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  constructor() {
  }

  @HostListener('click') onMouseEnter() {
    this.isOpen = !this.isOpen;
  }

}
