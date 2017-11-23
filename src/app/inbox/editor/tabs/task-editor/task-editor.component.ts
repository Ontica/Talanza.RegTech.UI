import { Component, Input } from '@angular/core';

import { InboxRef } from '../../../data-types/inbox';

@Component({
  selector:'task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})

export class TaskEditorComponent {

  private _inboxItem: InboxRef;
  @Input()
  set inboxItem(inboxItem: InboxRef) {
    this._inboxItem = inboxItem;
  }
  get inboxItem(): InboxRef {
    return this._inboxItem;
  }

  public files: File[]=[];

  public getSelectedFile(files: FileList): void {   
    this.files.push(files.item(0));
  
  }

}