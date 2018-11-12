/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { ContractClauseRef } from '@app/models/regulation';

@Component({
  selector: 'emp-gov-contract-view',
  templateUrl: './contracts-main-page.component.html',
  styleUrls: ['./contracts-main-page.component.scss']
})
export class ContractsMainPageComponent implements OnInit {

  isVisibleLeftPanel = true;

  centerPanelWidth = '80%';
  leftResizeWidth = 3;
  leftPanelWidth = '';

  private isResizeDiv = false;
  private centerPanelPreviousWidth = '';

  clausesList: ContractClauseRef[] = [];
  clause: ContractClauseRef;

  isSelectedClause = false;

  ngOnInit() {
    this.leftPanelWidth = 'calc(20% - ' + this.leftResizeWidth + 'px)';
  }

  onResize(event: MouseEvent): void {
    this.isResizeDiv = true;

    event.preventDefault();
    event.stopPropagation();
  }

  onHideLeftPanel(): void {
    this.isVisibleLeftPanel = !this.isVisibleLeftPanel;

    if (!this.isVisibleLeftPanel) {
      this.centerPanelPreviousWidth = this.centerPanelWidth;
      this.centerPanelWidth = 'calc(100% - ' + this.leftResizeWidth + 'px)';
    } else {
      this.centerPanelWidth = this.centerPanelPreviousWidth;
    }

  }

  onSelectedClauseRef(clauseRef: ContractClauseRef): void {
    this.isSelectedClause = true;

    this.clause = clauseRef;
  }

  onChangeClausesList(clausesList: ContractClauseRef[]): void {
    this.clausesList = clausesList;
  }

}
