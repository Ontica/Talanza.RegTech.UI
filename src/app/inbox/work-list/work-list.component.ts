/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { InboxService } from '@app/services/inbox';

import { InboxFilter, InboxRef } from '@app/models/inbox';


@Component({
  selector: 'emp-steps-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent {

  inboxList: InboxRef[] = [];
  selectedItem: InboxRef;
  isEditorWindow = false;

  private _filter: InboxFilter;
  @Input()
  set filter(filter: InboxFilter) {
    this._filter = filter;

    this.loadInboxes();
  }
  get filter(): InboxFilter {
    return this._filter;
  }

  constructor(private inboxService: InboxService) { }

  closeInboxEditorWindow(): void {
    this.isEditorWindow = false;
  }

  openInboxEditorWindow(selectedItem: any): void {
    this.selectedItem = selectedItem;
    this.isEditorWindow = true;
  }

  private loadInboxes(): void {
    const errMsg = 'Ocurrió un problema al intentar buscar la lista de elementos en el inbox.';

    this.inboxService.getInboxItems(this.filter)
      .toPromise()
      .then((x) => { this.inboxList = x; })
      .catch((e) => this.exceptionHandler(e, errMsg));

  }

  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

}
