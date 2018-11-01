/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { ProcedureService } from '@app/services/regulation';

import { Procedure } from "@app/models/regulation";


@Component({
  selector: 'procedure-info',
  templateUrl: './procedure-info.component.html',
  styleUrls: ['./procedure-info.component.scss'],
  providers: [ProcedureService]
})
export class ProcedureInfoComponent {

  private _procedureUID: string = '';
  @Input()
  set procedureUID(procedureUID: string) {
    if (procedureUID) {
      this._procedureUID = procedureUID;

      this.loadProcedure();
    }
  }

  get procedureUID(): string {
    return this._procedureUID;
  }

  public selectedTask: string = 'generalInfo';
  public procedure: Procedure;

  public constructor(private procedureService: ProcedureService) { }

  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
  }

  private loadProcedure(): void {
    const errMsg = 'Ocurrió un problema al intentar guardar.';

    this.procedureService.getProcedure(this.procedureUID)
      .then((procedure) => this.procedure = procedure)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }

}
