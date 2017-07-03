import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'general-info-tab',
  templateUrl: './general-info-tab.component.html',
  styleUrls: ['./general-info-tab.component.scss']
})

export class GeneralInfoTabComponent {

  @Output() public onCancelEvent = new EventEmitter();

  public cancel(): void {
    this.close();
  }

  private close(): void {
    this.onCancelEvent.emit();
  }

}
