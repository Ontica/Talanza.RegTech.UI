/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';


export enum RagStatus {
  Red = 'Red',
  Amber = 'Amber',
  Green = 'Green',
  NoColor = 'NoColor'
}


@Component({
  selector: 'rag-status-control',
  template: `
    <div class="circle" [ngClass]="statusColorCssClass"
         (click)="onclick()">
    </div>
  `,
  styleUrls: ['./rag-status.control.scss']
})
export class RagStatusControl {

  @Output() change = new EventEmitter<RagStatus>();

  @Input()
  get status(): RagStatus { return this._status; }

  set status(status: RagStatus) {
    this._status = status;

    this.applyStatusColorCssClass();
  }
  private _status: RagStatus = RagStatus.NoColor;


  protected statusColorCssClass = '';


  onclick() {
    const nextColor = this.getNextColor();

    this.change.emit(nextColor);
  }

  // private methods

  private applyStatusColorCssClass() {
    switch (this.status) {

      case RagStatus.Red:
        this.statusColorCssClass = 'red';
        return;

      case RagStatus.Amber:
        this.statusColorCssClass = 'amber';
        return;

      case RagStatus.Green:
        this.statusColorCssClass = 'green';
        return;

      case RagStatus.NoColor:
        this.statusColorCssClass = 'no-color';
        return;

      default:
        this.statusColorCssClass = 'no-color';
        console.log(`Unrecognized RAG-color '${this.status}'.`);
        return;
    }
  }


  private getNextColor(): RagStatus {
    switch (this.status) {

      case RagStatus.Red:
        return RagStatus.NoColor;

      case RagStatus.Amber:
        return RagStatus.Red;

      case RagStatus.Green:
        return RagStatus.Amber;

      case RagStatus.NoColor:
        return RagStatus.Green;

      default:
        throw new Error(`Unrecognized RAG-color '${this.status}'.`);
    }
  }

}
