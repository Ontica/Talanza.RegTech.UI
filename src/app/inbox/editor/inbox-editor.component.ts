/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, HostBinding,
         Input, Output } from '@angular/core';

import { InboxRef } from '@app/models/inbox';


@Component({
  selector: 'inbox-editor',
  templateUrl: './inbox-editor.component.html',
  styleUrls: ['./inbox-editor.component.scss'],
})
export class InboxEditorComponent {

  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  private _inboxItem: InboxRef;
  @Input()
  set inboxItem(item: InboxRef) {
    this._inboxItem = item;
  }
  get inboxItem(): InboxRef {
    return this._inboxItem;
  }

  @Output() public onCloseEvent = new EventEmitter();

  public selectedTask: string = 'generalInfo';
  public concluededTaskLabel = '';

  public constructor() { }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

}
