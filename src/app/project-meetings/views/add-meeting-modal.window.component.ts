import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Faq } from '../data-types/faq';

@Component({
    selector:'add-meeting-modal-window',
    templateUrl: './add-meeting-modal-window.component.html',
    styleUrls: ['./add-meeting-modal-window.component.scss']
})

export class AddMeetingModalWindowComponent {
  
    
    @Output() public onCloseTicket = new EventEmitter();

    public close(): void {           
        this.onCloseTicket.emit();
    }
    
}