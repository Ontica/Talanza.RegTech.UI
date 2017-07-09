import { Component, Input, OnInit } from '@angular/core';

import { Procedure } from '../../data-types/procedure';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'conditions-tab',
  templateUrl: './conditions-tab.component.html',
  styleUrls: ['./conditions-tab.component.scss'],
  providers: [ProcedureService]
})

export class ConditionsTabComponent implements OnInit {
  @Input() public procedure: Procedure;

  constructor(private procedureService: ProcedureService) { }

  public ngOnInit() {}

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
