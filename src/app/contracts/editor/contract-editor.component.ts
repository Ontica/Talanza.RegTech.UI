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

@Component({
  selector: 'contract-editor',
  templateUrl: './contract-editor.component.html',
  styleUrls: ['./contract-editor.component.scss'],
})

export class ContractEditorComponent implements OnInit {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();

  public selectedTask: string = '';
  public isDisabled = false;

  constructor() { }

  public async ngOnInit() {
    this.selectedTask = 'clauseInfo';
  }

  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
  }

  public close(): void {
    this.onCloseEvent.emit();
  }

}
