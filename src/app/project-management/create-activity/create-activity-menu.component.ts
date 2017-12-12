import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ProjectRef } from '../data-types/project'; 
import { EmpityActivityRef } from '../data-types/activity';

@Component ({
  selector: 'create-activity-menu',
  templateUrl: './create-activity-menu.component.html',
  styleUrls: ['./create-activity-menu.component.scss']
})

export class CreateActivityMenuComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();
  
  @Input() public project: ProjectRef;

  public selectedOperation = '';
  public task = EmpityActivityRef(); 

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {
    this.onClose();
  }

  public addManualTask(): void {    
    this.task.project.uid = this.project.uid;
    this.selectedOperation = 'addManual';
  }

  public addEvent(): void { 
    this.selectedOperation = 'addEvent';
  }

}