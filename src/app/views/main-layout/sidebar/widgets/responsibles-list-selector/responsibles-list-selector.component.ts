/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '@app/core/data-types';


@Component({
  selector: 'emp-steps-responsibles-list-selector',
  templateUrl: './responsibles-list-selector.component.html',
  styleUrls: ['../widgets.scss']
})
export class ResponsiblesListSelectorComponent {

  selectedOptions: string[] = ['all'];

  @Input() responsibles: Contact[];

  @Input()
  set selected(value: Contact[]) {
    if (!value || value.length === 0) {
      this.selectedOptions = ['all'];
    } else {
      this.selectedOptions = value.map(x => x.uid);
    }
  }

  @Output() selectedResponsiblesChange = new EventEmitter<Contact[]>();


  onSelected(value: string) {
    if (this.selectedOptions.length === 0) {
      value = 'all';
    }
    if (value === 'all') {
      this.selectedOptions = ['all'];

      this.selectedResponsiblesChange.emit([]);

      return;
    }

    this.selectedOptions = this.selectedOptions.filter(x => x !== 'all');

    const array = this.selectedOptions.map(x => this.responsibles.find(y => y.uid === x));

    this.selectedResponsiblesChange.emit(array);
  }

}
