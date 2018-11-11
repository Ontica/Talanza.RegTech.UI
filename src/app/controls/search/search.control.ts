/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'emp-ng-search-control',
  templateUrl: './search.control.html',
  styleUrls: ['./search.control.scss']
})

export class SearchControl {

  @Output() search = new EventEmitter<string>();

  keywords = '';


  onCancel(): void {
    this.keywords = '';
  }


  onSearch(): void {
    if (this.keywords) {
      this.search.emit(this.keywords);
    }
  }

}
