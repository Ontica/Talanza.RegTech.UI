/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Clause, SmallClause } from '../../data-types/clause';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'clause-info-tab',
  templateUrl: './clause-info-tab.component.html',
  styleUrls: ['./clause-info-tab.component.scss'],
  providers: [ContractService]

})

export class ClauseInfoTabComponent implements OnInit {
  @Input() public clauseInfo: SmallClause;
  @Output() public onCancel = new EventEmitter();
  @Output() public onSave = new EventEmitter();

  public clause: Clause = new Clause();
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
      if (this.clauseInfo.uid === '') {
        await this.createClause();
        this.clauseInfo.uid = this.clause.uid;
        this.isDisabled = true;
        this.onSave.emit();
        return;
      }

      await this.updateClause();
      alert('La claúsula se actualizado con exito.');
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
    this.clause = await this.contractService.createClause(this.clauseInfo.contractUID, this.clause);
  }

  private async updateClause() {
    this.clause = await this.contractService.updateClause(this.clauseInfo.contractUID, this.clause);
  }

  private async setClause() {
    if (this.clauseInfo.uid !== '') {
      this.clause = await this.contractService.getClause(this.clauseInfo.contractUID, this.clauseInfo.uid);
      this.buttonLabelSave = 'Guardar cambios';
    } else {
      this.buttonLabelSave = 'Agregar claúsula';
    }
  }

  private validate(): boolean {
    if (this.clause.clauseNo === '') {
      alert('El número de la claúsula se encuentra en blanco.');
      return false;
    }
    if (!this.clause.sourcePageNo) {
      alert('el número de pagina donde se encuentra la claúsula en el contrato se encuentra en blanco.');
      return;
    }
    if (this.clause.title === '') {
      alert('El nombre de la claúsula se encuentra en blanco.');
      return false;
    }
    if (this.clause.text === '') {
      alert('El texto de la claúsula se encuentra en blanco.');
      return false;
    }
    return true;
  }

}
