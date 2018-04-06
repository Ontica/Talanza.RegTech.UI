/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Faq, EmptyFaq } from '../data-types/faq';
import { FAQService } from '../services/faq.service';


@Component({
    selector:'update-faq',
    templateUrl: './update-faq.component.html',
    styleUrls: ['./update-faq.component.scss'],
    providers:[FAQService]
})

export class UpdateFAQComponent  { 
  
    private _faq = EmptyFaq();

    @Input()
    set faq(faq: Faq) {
        this._faq = faq;
    }
    get faq(): Faq {
        return this._faq;
    }

    @Output() public onClose = new EventEmitter();

    constructor(private faqService: FAQService) {}   
    
    public async onUpdateFAQ() {
        if (!this.validate()) {
            return;
        }

        this.updateFAQ();
        
        this.cleanFAQ();
    }

    private validate(): boolean {

        if (this.faq.question === '') {
            alert('Uts!!!, la pregunta se encuentra en blanco...');
            return false;
        }
        if (this.faq.answer === '') {
            alert('Uts!!!, la respuesta se encuentra en blanco...');
            return false;
        }
        if (this.faq.accessMode === '') {
            alert('Uts!!!, No has seleccionado la visibilidad');
            return false;
        }
        if (this.faq.status === '') {
            alert('Uts!!!, No has seleccionado el status');
            return false;
        }

        return true;
    }

    private updateFAQ(): void {      
        this.faqService.updateFAQ(this.faq)
                        .subscribe((x) => { alert("!Se actualizo la faq!");
                        this.onClose.emit();});
                                    
    }

    private close(): void {       
        this.onClose.emit();
    }

    private cleanFAQ(): void {
        this.faq = EmptyFaq();
    }
    
}