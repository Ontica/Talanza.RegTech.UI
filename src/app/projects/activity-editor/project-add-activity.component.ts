/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, HostBinding, Output} from '@angular/core';

@Component({
  selector: 'project-add-activity',
  templateUrl: './project-add-activity.component.html',
  styleUrls: ['./project-add-activity.component.scss']
})

export class ProjectAddActivityComponent {
@HostBinding('style.display') public display = 'block';
@HostBinding('style.position') public position = 'absolute';
@Output() public onCloseEvent = new EventEmitter();

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {
    this.onClose();    
  }

}