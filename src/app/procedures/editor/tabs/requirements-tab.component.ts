/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, Input, OnInit } from '@angular/core';

import { Procedure } from '../../data-types/procedure';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'requirements-tab',
  templateUrl: './requirements-tab.component.html',
  styleUrls: ['./requirements-tab.component.scss'],
  providers: [ProcedureService]
})

export class RequirementsTabComponent {
  @Input() public procedure: Procedure;

  public constructor(private procedureService: ProcedureService) { }

  public saveProcedureChanges(): void {
    this.updateProcedure();
    alert('El trámite se actualizó correctamente.');
  }

  public async cancel() {
    await this.setProcedure();
  }

  private updateProcedure(): void {
    this.procedureService.updateProcedure(this.procedure).then((procedure) => {
      this.procedure = procedure;
    });
  }

  private async setProcedure() {
    await this.procedureService.getProcuedure(this.procedure.uid).then((procedure) => {
      this.procedure = procedure;
    });
  }

}
