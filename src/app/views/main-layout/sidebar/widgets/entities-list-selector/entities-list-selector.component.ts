/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'emp-steps-entities-list-selector',
  templateUrl: './entities-list-selector.component.html',
  styleUrls: ['../widgets.scss']
})
export class EntitiesListSelectorComponent {

  @Input() entities: string[];

  @Input()
  set selected(value: string[]) {
    if (!value || value.length === 0) {
      this.selectedOptions = ['all'];
    } else {
      this.selectedOptions = value;
    }
  }

  @Output() selectedEntitiesChange = new EventEmitter<string[]>();

  selectedOptions: string[] = ['all'];

  onSelected(value: string) {
    if (this.selectedOptions.length === 0) {
      value = 'all';
    }
    if (value === 'all') {
      this.selectedOptions = ['all'];

      this.selectedEntitiesChange.emit([]);

      return;
    }

    this.selectedOptions = this.selectedOptions.filter(x => x !== 'all');

    const array = this.selectedOptions.map(x => this.entities.find(y => y === x));

    this.selectedEntitiesChange.emit(array);
  }

}
