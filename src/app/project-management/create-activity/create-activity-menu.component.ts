import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component ({
  selector: 'create-activity-menu',
  templateUrl: './create-activity-menu.component.html',
  styleUrls: ['./create-activity-menu.component.scss']
})

export class CreateActivityMenuComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {
    this.onClose();
  }

}