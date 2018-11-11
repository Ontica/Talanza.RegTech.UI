import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'add-meeting-modal-window',
    templateUrl: './add-meeting-modal-window.component.html',
    styleUrls: ['./add-meeting-modal-window.component.scss']
})

export class AddMeetingModalWindowComponent {


    @Output() onCloseTicket = new EventEmitter();

    close(): void {
        this.onCloseTicket.emit();
    }

}
