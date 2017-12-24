/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Assertion } from 'empiria';
import { CoreService } from '../../core';

import { ContractsService } from '../services/contracts.service';

import { ContractClauseRef, ContractClause,  EmptyContractClause } from '../data-types/contract';

@Component ({
  selector: 'clause-definition',
  templateUrl: './clause-definition.component.html',
  styles:['./clause-definition.component.scss'],
  providers: [ContractsService],
  encapsulation: ViewEncapsulation.Native
})

export class ClauseDefinitionComponent {
 
  constructor(private core: CoreService, private contractService: ContractsService) { }

  private _clause: ContractClause = EmptyContractClause();
  @Input()
  set clause(clause: ContractClause) {    
    if (clause && clause.uid != '') {
      this._clause = clause;
    } 
  }

  get clause(): ContractClause {
    return this._clause;
  }

}
