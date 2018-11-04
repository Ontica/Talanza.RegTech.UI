import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'add-requirement-list-tab',
  templateUrl: './add-requirement-list-tab.component.html',
  styleUrls: ['./add-requirement-list-tab.component.scss']
})

export class AddRequirementListTabComponent {

  @Output() public isCanceled = new EventEmitter<boolean>();

  cancel(): void {
    this.isCanceled.emit(true);
  }

}
