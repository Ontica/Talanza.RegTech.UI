import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface NavBarConfig {
  name: string;
  displayText: string;
}

@Component({
  selector: 'emp-ng-navbar',
  templateUrl: './nav-bar.control.html',
  styleUrls: ['./nav-bar.control.scss']
})

export class NavBarControl {

  @Input() options: NavBarConfig[] = [];

  @Output() select = new EventEmitter<string>();

  selectedOption = '';

  onSelect(option: string): void {
    this.selectedOption = option;
    this.select.emit(this.selectedOption);
  }

}
