/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

import { Process } from '@app/models/regulation';


@Component({
  selector: 'emp-steps-save-process-dialog',
  templateUrl: './save-process-dialog.component.html',
  styleUrls: ['./save-process-dialog.component.css']
})
export class SaveProcessDialogComponent {

  process: Process = new Process();
  alerts: string;

  @Output() save = new EventEmitter<Process>();
  @Output() cancel = new EventEmitter();

  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.position') private position = 'absolute';

  constructor() {
    this.process.name = '';
    this.process.version = '';
  }


  onCancel(): void {
    this.closePopup();
  }


  onSave(): void {
    if (!this.validate()) {
      return;
    }

    this.save.emit(this.process);
    this.closePopup();
  }


  private closePopup(): void {
    this.cancel.emit();
  }


  private validate(): Boolean {
    if (this.process.name.length === 0) {
      this.alerts = 'El nombre se encuentra en blanco';
      return false;
    }
    if (this.process.version.length === 0) {
      this.alerts = 'La versión se encuentra en blanco';
      return false;
    }
    return true;
  }

}
