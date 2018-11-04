import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'add-requirement-tab',
  templateUrl: './add-requirement-tab.component.html',
  styleUrls: ['./add-requirement-tab.component.scss']
})

export class AddRequirementTabComponent {

  @Output() isCanceled = new EventEmitter<boolean>();

  isAddRequirement = false;
  title = 'Agregar un requisito al trámite';

  cancel(): void {
    this.isCanceled.emit(true);
  }


  addRequirementToList(): void {
    this.isAddRequirement = false;
    this.setTitle();
  }


  cancelRequirementToLit(): void {
    this.isAddRequirement = false;
    this.setTitle();
  }


  onGotoURL(url: string): void {
    window.open(url);
  }


  onChangeRequirement(requirement: string): void {
    if (requirement === 'Add') {
      this.isAddRequirement = true;
      this.setTitle();
    }
  }


  private setTitle(): void {
    if (this.isAddRequirement) {
      this.title = 'Agregar un requisito a la lista';
    } else {
      this.title = 'Agregar un requisito al trámite';
    }
  }

}
