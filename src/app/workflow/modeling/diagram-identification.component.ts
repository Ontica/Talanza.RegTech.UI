/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

import { Process } from './process';

@Component({
  selector: 'diagram-identification-popup',
  templateUrl: './diagram-identification.component.html',
  styleUrls: ['diagram-identification.component.css']
})

export class DiagramIdentificationComponent {

  public process: Process = new Process();
  public alerts: string;

  @Output() public onSetDiagramIdentificationEvent = new EventEmitter<Process>();
  @Output() public onCancelEvent = new EventEmitter();

  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.position') private position = 'absolute';

  constructor() {
    this.process.name = '';
    this.process.version = '';
  }

  public setDiagramIdentification(): void {
    if (!this.validate()) {
      return;
    }

    this.onSetDiagramIdentificationEvent.emit(this.process);
    this.closePopup();
  }

  public cancel(): void {
    this.closePopup();
  }

  private closePopup(): void {
    this.onCancelEvent.emit();
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
