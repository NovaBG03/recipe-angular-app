import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() pageChanged = new EventEmitter<string>()

  onPageSelect(pageName: string) {
    this.pageChanged.emit(pageName);
  }
}
