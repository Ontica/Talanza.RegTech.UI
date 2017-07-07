import { Component, Input, OnInit } from '@angular/core';

import { Procedure } from '../../data-types/procedure';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'duties-payments-tab',
  templateUrl: './duties-payments-tab.component.html',
  styleUrls: ['./duties-payments-tab.component.scss'],
  providers: [ProcedureService]
})

export class DutiesPaymentsTabComponent {
  @Input() public procedure: Procedure;
  public isFree = false;
  
  constructor(private procedureService: ProcedureService) { }

  public saveProcedureChanges(): void {
    this.updateProcedure();
    alert("El trámite se actualizó correctamente!!!");
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
    this.procedureService.updateProcedure(this.procedure).then((procedure) => { });
  }


  private async setProcedure() {
    await this.procedureService.getProcuedure(this.procedure.uid).then((procedure) => {
      this.procedure = procedure;
    });
  }
   
}