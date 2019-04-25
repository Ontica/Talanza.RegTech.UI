/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { Requirement, Procedure } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-pv-requirements',
  templateUrl: './pv-requirements.component.html',
  styleUrls: ['./pv-requirements.component.scss']
})
export class PVRequirementsComponent {

  conditions: Requirement[] = [];
  inputDocuments: Requirement[] = [];
  outputDocuments: Requirement[] = [];

  @Input()
  get procedure() { return this._procedure; }
  set procedure(procedure: Procedure) {
    if (!procedure) {
      return;
    }
    this._procedure = procedure;
    this.loadRequirements();
  }
  private _procedure: Procedure;


  openExternalWindow(url: string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }


  private loadRequirements() {
    this.loadConditions();
    this.loadInputDocuments();
    this.loadOutputDocuments();
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
