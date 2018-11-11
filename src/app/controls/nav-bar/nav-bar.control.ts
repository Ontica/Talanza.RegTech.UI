import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface NavBarConfig {
  name: string;
  displayText: string;
}

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.control.html',
  styleUrls: ['./nav-bar.control.scss']
})

export class NavBarControl {

  @Input() options: NavBarConfig[] = [];

  @Output() onSelect = new EventEmitter<string>();

  selectedOption = '';

  select(option: string): void {
    this.selectedOption = option;
    this.onSelect.emit(this.selectedOption);
  }

}
