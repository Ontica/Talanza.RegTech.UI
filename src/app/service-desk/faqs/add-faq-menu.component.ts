import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Faq } from '../data-types/faq';

@Component({
    selector:'add-faq-menu',
    templateUrl: './add-faq-menu.component.html',
    styleUrls: ['./add-faq-menu.component.scss']
})

export class AddFAQMenuComponent {

    public selectedTask: string = 'faq';

    private _faq: Faq;
    @Input() 
    set faq(faq: Faq) {
        this._faq = faq;
    }
    get faq(): Faq {
        return this._faq;
    }

    @Input() operation: string;

    @Output() public onClose = new EventEmitter();

    public setSelectedTask(selectedTask: string): void {
        this.selectedTask = selectedTask;    
    }

    public close(): void {        
        this.onClose.emit();
    }

    
}