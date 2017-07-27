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
    this.setClause();
  }

  public async saveClause() {
    if (!this.validate()) {
      return;
    }

    try {
      if (this.contractClause.uid === '') {
        await this.createClause();
        this.isDisabled = true;
        this.onSave.emit();
        return;
      }

      await this.updateClause();
      alert('La claúsula se actualizó correctamente.');
      this.isDisabled = true;
    } catch (e) {
      alert(e);
    }
  }

  public edit(): void {
    this.isDisabled = false;
  }

  public cancel(): void {
    this.onCancel.emit();
  }

  private async createClause() {
    this.contractClause = await this.contractService.createClause(this.contractClause.contractUID, this.contractClause);
  }

  private async updateClause() {
    this.contractClause = await this.contractService.updateClause(this.contractClause.contractUID, this.contractClause);
  }

  private async setClause() {
    if (this.contractClause.uid !== '') {
      this.contractClause = await this.contractService.getClause(this.contractClause.contractUID, this.contractClause.uid);
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

}
