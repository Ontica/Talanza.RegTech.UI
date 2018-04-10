import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Faq } from '../data-types/faq';

@Component({
    selector:'add-faq-modal-window',
    templateUrl: './add-faq-modal-window.component.html',
    styleUrls: ['./add-faq-modal-window.component.scss']
})

export class AddFAQModalWindowComponent {

    public selectedTask: string = 'faq';
    
    @Output() public onClose = new EventEmitter();

    public close(): void {        
        this.onClose.emit();
    }
    
}