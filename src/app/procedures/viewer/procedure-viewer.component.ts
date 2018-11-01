/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding,
         Input, Output } from '@angular/core';

import { Procedure } from '../../models/procedures/procedure';
import { ProcedureService } from '../../services/procedures/procedure.service';

@Component({
  selector:'procedure-viewer',
  templateUrl: './procedure-viewer.component.html',
  styleUrls: ['./procedure-viewer.component.scss'],
  providers: [ProcedureService]
})

export class ProcedureViewerComponent {

  // @HostBinding('style.display') public display = 'block';
  // @HostBinding('style.position') public position = 'absolute';

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

  @Output() public onCloseEvent = new EventEmitter();

  public selectedTab: string = 'generalInfo';
  public procedure: Procedure;

  public constructor(private procedureService: ProcedureService) { }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  private loadProcedure(): void {
    const errMsg = 'Ocurrió un problema al intentar guardar.';

    this.procedureService.getProcedure(this.procedureUID)
                         .then((procedure) => this.procedure = procedure)
                         .catch((e) => this.exceptionHandler(e,errMsg));
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
