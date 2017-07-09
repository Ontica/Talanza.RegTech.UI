import { Component, Input, OnInit } from '@angular/core';

import { Procedure } from '../../data-types/procedure';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'filing-fee-tab',
  templateUrl: './filing-fee-tab.component.html',
  styleUrls: ['./filing-fee-tab.component.scss'],
  providers: [ProcedureService]
})

export class FilingFeeTabComponent {
  @Input() public procedure: Procedure;
  public isFree = false;

  constructor(private procedureService: ProcedureService) { }

  public saveProcedureChanges(): void {
    this.updateProcedure();
    alert('El trámite se actualizó correctamente.');
  }

  public onChangeFilingFeeType(filingFeeType: string) {
    if (filingFeeType === 'Trámite gratuito') {
      this.procedure.filingFee.feeAmount = 0;
      this.isFree = true;
    }

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
