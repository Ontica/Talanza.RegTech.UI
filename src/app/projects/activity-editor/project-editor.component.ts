/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ProjectRef } from '../data-types/project';

@Component({
  selector: 'project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss'],
  
})

export class ProjectEditorComponent  {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Input() public project: ProjectRef;
  @Input() public parentId: number;
  @Input() public activityId: number;
  @Output() public onCloseEvent = new EventEmitter();

  public currentSelectedTab = 'general-info-tab';
  public isDisabled = false;
  public title = '';
  
  public setSaveOperations(): void {
    
    this.enableTabs();
  }

  public onChangeTab(newSelectedTab: string): void {
    this.currentSelectedTab = newSelectedTab;
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  private disableTabs(): void {
    this.isDisabled = true;
  }

  private enableTabs(): void {
    this.isDisabled = false;
  }

  

}
