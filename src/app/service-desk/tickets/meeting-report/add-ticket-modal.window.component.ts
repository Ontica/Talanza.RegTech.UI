import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Faq } from '../data-types/faq';

@Component({
    selector:'add-tickt-modal-window',
    templateUrl: './add-ticket-modal-window.component.html',
    styleUrls: ['./add-ticket-modal-window.component.scss']
})

export class AddTicketModalWindowComponent {
  
    
    @Output() public onCloseTicket = new EventEmitter();

    public close(): void {           
        this.onCloseTicket.emit();
    }
    
}