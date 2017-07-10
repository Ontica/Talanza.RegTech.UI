/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import {
  ChangeDetectorRef, Component, EventEmitter, HostBinding,
  Input, Output, OnInit
} from '@angular/core';

import { Procedure } from '../data-types/procedure';

import { ProcedureService } from '../services/procedure.service';

@Component({
  selector: 'procedure-editor',
  templateUrl: './procedure-editor.component.html',
  styleUrls: ['./procedure-editor.component.scss'],
  providers: [ProcedureService]
})

export class ProcedureEditorComponent implements OnInit {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();
  @Input() public procedureUID: string;

  public selectedTask: string = '';
  public newNameLabel = '';
  public procedure: Procedure = new Procedure();
  public isDisabled = false;
  public isNewProcedure = false;

  constructor(private ref: ChangeDetectorRef, private procedureService: ProcedureService) { }

  public async ngOnInit() {
    await this.setProcedure();
    this.setNewProcedureTitle();
    this.selectedTask = 'generalInfo';
  }

  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
    this.ref.detectChanges();
  }
  
  public onDisabledTabs(disabled: boolean): void {
    this.isDisabled = disabled;
  }

  public close(): void {
    this.onCloseEvent.emit();
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
      this.procedure = new Procedure();
      return;
    }
    await this.procedureService.getProcuedure(this.procedureUID).then((procedure) => {
      this.procedure = procedure;
    });
  }

}
