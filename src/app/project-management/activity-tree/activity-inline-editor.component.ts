/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'emp-steps-activity-inline-editor',
  template: `
    <input #txtActivityName type="text"
      class='text-box inline-editor-text-box'
      (keyup.esc)='onCancel()'
      (keyup.enter)='onInsert(txtActivityName.value)'
      placeholder= 'Agregar una actividad'>
    <button class='btn' (click)='onCancel()'>Cancelar</button>
  `,
  styleUrls: ['./activity-inline-editor.component.scss']
})
export class ActivityInlineEditorComponent {

  @Output() cancel = new EventEmitter<void>();

  @Output() insert = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit();
  }

  onInsert(activityName: string) {
    this.insert.emit(activityName);
  }

}
