/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { ContractClauseRef } from '@app/models/regulation';

@Component({
  selector: 'contract-view',
  templateUrl: './contracts-main-page.component.html',
  styleUrls: ['./contracts-main-page.component.scss']
})
export class ContractsMainPageComponent implements OnInit {

  public isVisibleLeftPanel = true;

  public centerPanelWidth = '80%';
  public leftResizeWidth = 3
  public leftPanelWidth = '';

  private isResizeDiv = false;
  private centerPanelPreviousWidth = '';

  private clausesList: ContractClauseRef[] = [];
  private clause: ContractClauseRef;

  public isSelectedClause = false;

  ngOnInit() {
    this.leftPanelWidth = 'calc(20% - '+ this.leftResizeWidth +'px)';
  }

  public onResize(event: MouseEvent): void {
    this.isResizeDiv = true;

    event.preventDefault();
    event.stopPropagation();
  }

  public onHideLeftPanel(): void {
    this.isVisibleLeftPanel = !this.isVisibleLeftPanel;

    if (!this.isVisibleLeftPanel) {
      this.centerPanelPreviousWidth  = this.centerPanelWidth;
      this.centerPanelWidth = 'calc(100% - '+ this.leftResizeWidth +'px)';
    } else {
      this.centerPanelWidth = this.centerPanelPreviousWidth;
    }

  }

  public onSelectedClauseRef(clauseRef: ContractClauseRef): void {
    this.isSelectedClause = true;

    this.clause = clauseRef;
  }

  public onChangeClausesList(clausesList: ContractClauseRef[]): void {
    this.clausesList = clausesList;
  }

}
