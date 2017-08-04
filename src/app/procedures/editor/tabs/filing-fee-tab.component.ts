import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Procedure } from '../../data-types/procedure';
import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'filing-fee-tab',
  templateUrl: './filing-fee-tab.component.html',
  styleUrls: ['./filing-fee-tab.component.scss'],
  providers: [ProcedureService]
})

export class FilingFeeTabComponent implements OnInit {

  @Output() public isEditable = new EventEmitter<boolean>();
  @Input() public procedure: Procedure;
  @Input() public isNewProcedure: boolean;

  public addButtonLabel = '';
  public isFree = false;
  public disabled = true;
  public isDisabled = true;

  constructor(private procedureService: ProcedureService) { }

  public ngOnInit() {
    this.setProcedureStatus();
    this.setProcedure();
  }

  public saveProcedureChanges(): void {
    if (!this.validation()) {
      return;
    }
    this.updateProcedure();
    alert('El trámite se actualizó correctamente.');
    this.disabled = true;
    this.isEditable.emit(false);
  }

  public onChangeFilingFeeType(filingFeeType: string) {
    if (filingFeeType === 'Trámite gratuito') {
      this.procedure.filingFee.feeAmount = 0;
      this.isFree = true;
    }

  }

  public async cancel() {
    await this.setProcedure();
    this.isEditable.emit(false);
  }

  public editProcedure(): void {
    this.disabled = false;
    this.isEditable.emit(true);
  }

  private updateProcedure(): void {
    this.procedureService.updateProcedure(this.procedure).then((procedure) => {
      this.procedure = procedure;
    });
  }

  private async setProcedure() {
    await this.procedureService.getProcedure(this.procedure.uid).then((procedure) => {
      this.procedure = procedure;
    });
  }

  private setProcedureStatus(): void {
    if (this.isNewProcedure) {
      this.disabled = false;
      this.addButtonLabel = 'Agregar trámite';
    } else {
      this.addButtonLabel = 'Guardar cambios';
    }
  }

  private validation(): boolean {
    if (this.procedure.filingFee.filingFeeType === '') {
      alert('Seleccionar el tipo de pago de la lista.');
      return false;
    }
    return true;
  }

}
