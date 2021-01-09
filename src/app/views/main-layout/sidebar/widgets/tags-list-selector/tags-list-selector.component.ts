/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'emp-steps-tags-list-selector',
  templateUrl: './tags-list-selector.component.html',
  styleUrls: ['../widgets.scss']
})
export class TagsListSelectorComponent {

  selectedOptions: string[] = ['all'];

  @Input() tags: string[];

  @Input()
  set selected(value: string[]) {
    if (!value || value.length === 0) {
      this.selectedOptions = ['all'];
    } else {
      this.selectedOptions = value;
    }
  }

  @Output() selectedTagsChange = new EventEmitter<string[]>();


  onSelected(value: string) {
    if (this.selectedOptions.length === 0) {
      value = 'all';
    }
    if (value === 'all') {
      this.selectedOptions = ['all'];

      this.selectedTagsChange.emit([]);

      return;
    }

    this.selectedOptions = this.selectedOptions.filter(x => x !== 'all');

    const array = this.selectedOptions.map(x => this.tags.find(y => y === x));

    this.selectedTagsChange.emit(array);
  }

}
