import { Component, EventEmitter, Output  } from '@angular/core';

@Component ({
  selector: 'add-requirement-tab',
  templateUrl: './add-requirement-tab.component.html',
  styleUrls: ['./add-requirement-tab.component.scss']
})

export class AddRequirementTabComponent {
  @Output() public isCanceled = new EventEmitter<boolean>();
  
  public cancel(): void {
    this.isCanceled.emit(true);
  }

}