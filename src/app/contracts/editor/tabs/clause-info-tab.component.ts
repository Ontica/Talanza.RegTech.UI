/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ContractClause } from '../../data-types/contract';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'clause-info-tab',
  templateUrl: './clause-info-tab.component.html',
  styleUrls: ['./clause-info-tab.component.scss'],
  providers: [ContractService]

})

export class ClauseInfoTabComponent implements OnInit {
  @Input() public contractClause: ContractClause;
  @Output() public onCancel = new EventEmitter();
  @Output() public onSave = new EventEmitter();

  public isDisabled = false;
  public buttonLabelSave = '';

  public constructor(private contractService: ContractService) { }

  public ngOnInit() {
    this.setButtonSaveLabel();
  }

  public async onClickSaveContractClause() {
    if (!this.validate()) {
      return;
    }

    if (this.isNewContractClause()) {
      await this.addNewClause();
      return;
    }

    await this.updateExistClause();
  }

  public onClickEditContractClause(): void {
    this.enableEditor();
  }

  public onClickCancel(): void {
    this.onCancel.emit();
  }

  private async addNewClause() {
    await this.createClause();
    alert('La claúsula o anexo se agregó correctamente.');

    this.disableEditor();
    this.onSave.emit();
  }

  private disableEditor(): void {
    this.isDisabled = true;
  }

  private enableEditor(): void {
    this.isDisabled = false;
  }

  private isNewContractClause(): boolean {
    if (this.contractClause.uid === '') {
      return true;
    }
    return false;
  }

  private async updateExistClause() {
    await this.updateClause();
    alert('La claúsula se actualizó correctamente.');

    this.disableEditor();
  }

  private async createClause() {
    const errMsg = 'Ocurrió un problema al intentar agregar la claúsula.';

    await this.contractService.createClause(this.contractClause.contract.uid,
                                            this.contractClause)
                              .then((contractClause) => this.contractClause.uid = contractClause.uid)
                              .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private async updateClause() {
    const errMsg = 'Ocurrió un problema al intentar actualizar la claúsula.';

    await this.contractService.updateClause(this.contractClause.contract.uid,
                                            this.contractClause)
                              .then((contractClause) => this.contractClause = contractClause)
                              .catch((e) => this.exceptionHandler(e, errMsg));

  }

  private setButtonSaveLabel(): void {
    if (!this.isNewContractClause()) {
      this.buttonLabelSave = 'Guardar cambios';
    } else {
      this.buttonLabelSave = 'Agregar claúsula';
    }
  }

  private validate(): boolean {
    if (this.contractClause.clauseNo === '') {
      alert('Requiero el número que identifica a la claúsula o anexo.');
      return false;
    }
    if (this.contractClause.title === '') {
      alert('Necesito conocer el nombre que identifica la claúsula o anexo dentro del contrato.');
      return false;
    }
    if (!this.contractClause.sourcePageNo) {
      alert('Requiero conocer la página del archivo donde se encuentra la claúsula o anexo.');
      return;
    }
    return true;
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
