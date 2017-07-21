import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'add-requirement-tab',
  templateUrl: './add-requirement-tab.component.html',
  styleUrls: ['./add-requirement-tab.component.scss']
})

export class AddRequirementTabComponent {
  @Output() public isCanceled = new EventEmitter<boolean>();

  public isAddRequirement = false;
  public title = 'Agregar un requisito al trámite';

  public cancel(): void {
    this.isCanceled.emit(true);
  }

  public addRequirementToList(): void {
    this.isAddRequirement = false;
    this.setTitle();
  }

  public cancelRequirementToLit(): void {
    this.isAddRequirement = false;
    this.setTitle();
  }

  public onGotoURL(url: string): void {
    window.open(url);
  }

  public onChangeRequirement(requirement: string): void {
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
