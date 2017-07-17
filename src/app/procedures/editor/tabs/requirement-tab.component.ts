import { Component } from '@angular/core';

@Component({
  selector:'requirement-tab',
  templateUrl: './requirement-tab.component.html',
  styleUrls: ['./requirement-tab.component.scss']
})

export class RequirementTabComponent {

  public isShowGrids = true;
  public isShowAddRequirementForm = false;
  public isAddRequirementListForm = false;

  public addRequirement(): void {    
    this.isShowAddRequirementForm = true;
    this.isShowGrids = false;    
    this.isAddRequirementListForm = false;
  }

  public addRequirementToList(): void {
    this.isShowAddRequirementForm = false;
    this.isShowGrids = false;
    this.isAddRequirementListForm = true;    
  }

  public onCancelForm(): void {
    this.isShowAddRequirementForm = false;
    this.isShowGrids = true;
    this.isAddRequirementListForm = false; 
  }

}