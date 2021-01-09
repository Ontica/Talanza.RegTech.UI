/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Contact } from '@app/core/data-types';

export interface SelectedContacts {
  registered: Contact[];
  additional: string;
}


@Component({
  selector: 'emp-ng-contacts-picker',
  templateUrl: './contacts-picker.component.html',
  styleUrls: ['../../../styles/general-styles.scss']
})
export class ContactsPickerComponent {

  @Input() registered: Contact[] = [];
  @Input() selected: Contact[] = [];
  @Input() additional: string;

  @Output() selectionChange = new EventEmitter<SelectedContacts>();

  onClickOkButton() {
    const data: SelectedContacts = {
      registered: this.selected,
      additional: this.additional
    };

    this.selectionChange.emit(data);
  }

  onRegisteredChanged(data: Contact[]) {
    this.selected = data;
  }

}
