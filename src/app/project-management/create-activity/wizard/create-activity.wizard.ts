import { Component } from '@angular/core';

import { ProcessModel, EmptyProcessModel } from '../../data-types/project'; 

@Component({
  selector:'create-activity-wizard',
  templateUrl: './create-activity.wizard.html',
  styleUrls: ['./create-activity.wizard.scss']
})

export class CreateActivityWizard  {
  
  public step = 1;

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

  public onBack(): void {
    if (this.step > 1) {
      this.processModel = null;
      this.step--;      
    }
    
  }

}