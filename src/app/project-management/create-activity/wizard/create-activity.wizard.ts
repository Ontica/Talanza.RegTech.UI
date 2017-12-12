import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProcessModel, EmptyProcessModel, ProjectRef } from '../../data-types/project'; 

@Component({
  selector:'create-activity-wizard',
  templateUrl: './create-activity.wizard.html',
  styleUrls: ['./create-activity.wizard.scss']
})

export class CreateActivityWizard  {
  
  @Input() public project: ProjectRef;

  @Output() public onCloseEvent = new EventEmitter();

  public step = 1;
  public isAdd = false;
  public processModel: ProcessModel;

  public onSelectProcessModel(processModel: ProcessModel): void {
    this.processModel = processModel;
  }

  public onNext(): void {
    if (!this.processModel ) {
      alert("No has seleccionado una actividad o evento");    
    } else {      
      this.step = 2;   
    }   
  }

  public onAdd():void {
    this.isAdd = true;
  }

  public onBack(): void {
    if (this.step > 1) {
      this.processModel = null;
      this.step--;      
    }    
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

}
