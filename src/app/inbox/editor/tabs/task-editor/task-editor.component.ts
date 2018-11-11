/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { InboxRef } from '@app/models/inbox';


@Component({
  selector: 'task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent {

  private _inboxItem: InboxRef;

  @Input()
  get inboxItem(): InboxRef {
    return this._inboxItem;
  }
  set inboxItem(inboxItem: InboxRef) {
    this._inboxItem = inboxItem;
  }

  files: File[] = [];

  getSelectedFile(files: FileList): void {
    this.files.push(files.item(0));

  }

}
