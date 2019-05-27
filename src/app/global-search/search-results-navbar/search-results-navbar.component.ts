import { Component, EventEmitter, Input, Output } from '@angular/core';


export interface NavBarConfig {
  name: string;
  displayText: string;
}


@Component({
  selector: 'emp-kb-search-results-navbar',
  templateUrl: './search-results-navbar.component.html',
  styleUrls: ['./search-results-navbar.component.scss']
})
export class SearchResultsNavBarComponent {

  @Input() options: NavBarConfig[] = [];

  @Output() navBarItemSelect = new EventEmitter<string>();

  selectedOption = '';

  onSelect(option: string): void {
    this.selectedOption = option;
    this.navBarItemSelect.emit(this.selectedOption);
  }

}
