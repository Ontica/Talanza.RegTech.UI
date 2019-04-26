/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'emp-steps-themes-list-selector',
  templateUrl: './themes-list-selector.component.html',
  styleUrls: ['../widgets.scss']
})
export class ThemesListSelectorComponent {

  selectedOptions: string[] = ['all'];

  @Input() themes: string[];

  @Input()
  set selected(value: string[]) {
    if (!value || value.length === 0) {
      this.selectedOptions = ['all'];
    } else {
      this.selectedOptions = value;
    }
  }

  @Output() change = new EventEmitter<string[]>();


  onSelected(value: string) {
    if (this.selectedOptions.length === 0) {
      value = 'all';
    }
    if (value === 'all') {
      this.selectedOptions = ['all'];

      this.change.emit([]);

      return;
    }

    this.selectedOptions = this.selectedOptions.filter(x => x !== 'all');

    const array = this.selectedOptions.map(x => this.themes.find(y => y === x));

    this.change.emit(array);
  }

}
