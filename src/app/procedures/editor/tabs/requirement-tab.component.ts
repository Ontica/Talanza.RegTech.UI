import { Component } from '@angular/core';

@Component({
  selector: 'emp-gov-requirement-tab',
  templateUrl: './requirement-tab.component.html',
  styleUrls: ['./requirement-tab.component.scss']
})

export class RequirementTabComponent {

  isShowGrids = true;
  isShowAddRequirementForm = false;
  isAddRequirementListForm = false;

  addRequirement(): void {
    this.isShowAddRequirementForm = true;
    this.isShowGrids = false;
    this.isAddRequirementListForm = false;
  }

  addRequirementToList(): void {
    this.isShowAddRequirementForm = false;
    this.isShowGrids = false;
    this.isAddRequirementListForm = true;
  }

  onCancelForm(): void {
    this.isShowAddRequirementForm = false;
    this.isShowGrids = true;
    this.isAddRequirementListForm = false;
  }

}
