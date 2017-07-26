/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import {
  Component, EventEmitter, HostBinding, Input, Output, OnInit
} from '@angular/core';

import { Clause, SmallClause } from '../data-types/clause';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'contract-editor',
  templateUrl: './contract-editor.component.html',
  styleUrls: ['./contract-editor.component.scss'],
  providers: [ContractService]
})

export class ContractEditorComponent implements OnInit {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();
  @Input() public clauseInfo: SmallClause;

  public clause = new Clause;
  public selectedTask = '';
  public isDisabled = false;
  public title = '';

  constructor(private contractService: ContractService) { }

  public ngOnInit() {
    this.setInitialSettings();
    this.selectedTask = 'clauseInfo';
  }

  public setSaveOperations(): void {
    this.setTitle();
    this.enableTabs();
  }

  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
  }

  public close(): void {
    this.onCloseEvent.emit();
  }

  private disableTabs(): void {
    this.isDisabled = true;
  }

  private enableTabs(): void {
    this.isDisabled = false;
  }

  private setInitialSettings(): void {
    if (this.clauseInfo.uid === '') {
      this.title = 'Nueva claúsula ';
      this.disableTabs();
    } else {
      this.setTitle();
    }
  }

  private async setTitle() {
    let clause = await this.contractService.getClause(this.clauseInfo.contractUID, this.clauseInfo.uid);
    this.title = clause.clauseNo + ' ' + clause.title;
  }

}
