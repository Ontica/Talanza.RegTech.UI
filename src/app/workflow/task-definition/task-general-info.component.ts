import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'task-general-info',
  templateUrl: './task-general-info.component.html',
  styleUrls: ['task-general-info.component.css']
})

export class TaskGeneralInfoComponent {

  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.position') private position = 'absolute';

  @Output() public onCancelEvent = new EventEmitter();

  public cancel(): void {
    this.closePopup();
  }

  private closePopup(): void {
    this.onCancelEvent.emit();
  }

}
