/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { Activity_Empty, Project } from '@app/models/project-management';


@Component({
  selector: 'create-activity-menu',
  templateUrl: './create-activity-menu.component.html',
  styleUrls: ['./create-activity-menu.component.scss']
})
export class CreateActivityMenuComponent {

  @HostBinding('style.display')  display  = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Output() onCloseEvent = new EventEmitter();

  @Input() project: Project;

  selectedOperation = '';
  task = Activity_Empty;

  onClose() {
    this.onCloseEvent.emit();
  }

  onClickCancel() {
    this.onClose();
  }

  addEvent() {
    this.selectedOperation = 'addEvent';
  }

  addManualTask() {
    this.task.project = this.project;
    this.selectedOperation = 'addManual';
  }

}
