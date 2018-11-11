/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { ProcedureService } from '@app/services/regulation';

import { Requirement } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-pe-requirements',
  templateUrl: './pe-requirements.component.html',
  styleUrls: ['./pe-requirements.component.scss'],
  providers: [ProcedureService]
})
export class PERequirementsComponent {

  procedure: any;
  conditions: Requirement[] = [];
  inputDocuments: Requirement[] = [];
  outputDocuments: Requirement[] = [];

  private _procedureUID = '';
  @Input()
  set procedureUID(procedureUID: string) {
    if (procedureUID) {
      this._procedureUID = procedureUID;

      this.loadRequirements();
    }
  }
  get procedureUID(): string {
    return this._procedureUID;
  }

  constructor(private procedureService: ProcedureService) { }

  private async loadRequirements() {
    await this.loadProcedure();
    this.loadConditions();
    this.loadInputDocuments();
    this.loadOutputDocuments();
  }

  openExternalWindow(url: string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

  private async loadProcedure() {
    await this.procedureService.getProcedure(this.procedureUID)
      .toPromise()
      .then(x => this.procedure = x);
  }

  private loadConditions(): void {
    this.conditions = this.procedure.requirements.filter((x) => x.type === 'Condition');
  }

  private loadInputDocuments(): void {
    this.inputDocuments = this.procedure.requirements.filter((x) => x.type === 'InputDocument');
  }

  private loadOutputDocuments(): void {
    this.outputDocuments = this.procedure.requirements.filter((x) => x.type === 'OutputDocument');
  }

  private onAttach(): void {
    const msg = 'Por el momento no es posible adjuntar archivos.';

    // alert(msg);
  }

  private onAssign(): void {
    const msg = 'Por el momento no es posible asignar tareas';

    // alert(msg);
  }

}
