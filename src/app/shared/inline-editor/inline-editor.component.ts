/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'emp-ng-inline-editor',
  template: `
    <input #txtField type="text"
      class='text-box inline-editor-text-box'
      (keyup.esc)='onCancel()'
      (keyup.enter)='onInsert(txtField.value)'
      placeholder= '{{placeholder}}' i18n-placeholder>
    <button class='btn' (click)='onCancel()' i18n>Cancel</button>
  `,
  styleUrls: ['./inline-editor.component.scss']
})
export class InlineEditorComponent {

  @Input() placeholder = '';

  @Output() cancel = new EventEmitter<void>();

  @Output() insert = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit();
  }

  onInsert(activityName: string) {
    this.insert.emit(activityName);
  }

}
