/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 import { Component, Input, OnInit } from '@angular/core';

 import { ContractClause } from '../data-types/contract';
  
 @Component({
   selector:'selected-clause',
   templateUrl: './contract-selected-clause.component.html',
   styleUrls:['./contract-selected-clause.component.scss']
 })

 export class ContractSelectedClauseComponent implements OnInit {
  
  @Input() clause: ContractClause;

  public isProcedruesTablesVisible = false;

  ngOnInit() {
    console.log(this.clause);
  }
  public onDisplayProcedruesList(): void {
    this.isProcedruesTablesVisible = !this.isProcedruesTablesVisible;
  }

 }