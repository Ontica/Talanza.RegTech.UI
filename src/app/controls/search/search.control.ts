/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Output } from '@angular/core';
import { emit } from 'cluster';

@Component({
    selector:'search-control',
    templateUrl:'./search.control.html',
    styleUrls:['./search.control.scss']
})

export class SearchControl {

    @Output() public onSearch = new EventEmitter<string>();

    public keywords = "";

    public search(): void {
        if (this.keywords) {
            this.onSearch.emit(this.keywords);           
        }      
    }
   
}
