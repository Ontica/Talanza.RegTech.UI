/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 import { Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';

 import {  ProjectRef } from '../data-types/project'; 

@Component({
  selector:'activity-add', 
  templateUrl:'./activity-add.component.html',
  styleUrls:['./activity-add.component.scss']
 
})

export class ActivityAddComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Input() public project: ProjectRef;

  @Output() public onCloseEvent = new EventEmitter();

  public isEvent = false;

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {
    this.onClose();
  }
}