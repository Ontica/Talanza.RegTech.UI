/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { ChangeDetectorRef, Component, EventEmitter,
         HostBinding, Input, Output, OnInit } from '@angular/core';

import { ProcedureService } from '@app/services/regulation';

import { Procedure } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-procedure-editor',
  templateUrl: './procedure-editor.component.html',
  styleUrls: ['./procedure-editor.component.scss']
})
export class ProcedureEditorComponent implements OnInit {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Output() close = new EventEmitter();
  @Input() procedureUID: string;

  selectedTask = '';
  newNameLabel = '';
  procedure: Procedure;
  isDisabled = false;
  isNewProcedure = false;

  constructor(private ref: ChangeDetectorRef,
              private procedureService: ProcedureService) { }

  async ngOnInit() {
    await this.setProcedure();
    this.setNewProcedureTitle();
    this.selectedTask = 'generalInfo';
  }


  setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
    this.ref.detectChanges();
  }


  onDisabledTabs(disabled: boolean): void {
    this.isDisabled = disabled;
  }


  onClose(): void {
    this.close.emit();
  }


  private setNewProcedureTitle(): void {
    if (this.isNewProcedure) {
      this.newNameLabel = 'Nuevo Trámite';
    }
  }


  private async setProcedure() {
    if (this.procedureUID === '') {
      this.isNewProcedure = true;
      this.isDisabled = true;
      this.procedure = null;
      return;
    }
    await this.procedureService.getProcedure(this.procedureUID)
      .toPromise()
      .then(x => this.procedure = x);
  }

}
