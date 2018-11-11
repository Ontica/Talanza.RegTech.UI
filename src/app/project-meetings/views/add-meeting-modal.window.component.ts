import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'emp-kb-add-meeting-modal-window',
  templateUrl: './add-meeting-modal-window.component.html',
  styleUrls: ['./add-meeting-modal-window.component.scss']
})

export class AddMeetingModalWindowComponent {

  @Output() close = new EventEmitter();

  onClose(): void {
    this.close.emit();
  }

}
