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
  selector: 'pv-requirements',
  templateUrl: './pv-requirements.component.html',
  styleUrls: ['./pv-requirements.component.scss'],
  providers: [ProcedureService]
})
export class PVRequirementsComponent {

  public procedure: any;
  public conditions: Requirement[] = [];
  public inputDocuments: Requirement[] = [];
  public outputDocuments: Requirement[] = [];

  private _procedureUID: string = '';
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

  public openExternalWindow(url: string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

  private async loadRequirements() {
    await this.loadProcedure();
    this.loadConditions();
    this.loadInputDocuments();
    this.loadOutputDocuments();
  }

  private async loadProcedure() {
    await this.procedureService.getProcedure(this.procedureUID).then((procedure) => {
      this.procedure = procedure;
    });

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


}
