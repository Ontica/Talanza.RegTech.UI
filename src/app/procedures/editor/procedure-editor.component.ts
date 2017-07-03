/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'procedure-editor',
  templateUrl: './procedure-editor.component.html',
  styleUrls: ['./procedure-editor.component.css']
})

export class ProcedureEditorComponent {
  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.position') private position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();

  public selectedTask = 'generalInfo';

  public constructor(private ref: ChangeDetectorRef) {
  }

  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
    this.ref.detectChanges();
  }

  private close(): void {
    this.onCloseEvent.emit();
  }

}
