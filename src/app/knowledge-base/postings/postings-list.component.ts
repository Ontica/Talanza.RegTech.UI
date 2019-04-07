/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { PostingsService } from '@app/services/knowledge-base';

import { Identifiable, Empty, isEmpty } from '@app/models/core';
import { Posting, EmptyPosting } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-postings-list',
  templateUrl: './postings-list.component.html',
  styleUrls: ['./postings-list.component.scss']
})
export class PostingsListComponent implements OnInit, OnChanges {

  @Input() target: Identifiable = Empty;
  @Input() readonly = false;

  _displayEditor = false;

  postingsList: Posting[] = [];
  selected: Posting = EmptyPosting();


  constructor(private store: PostingsService) {}


  ngOnInit() {

  }


  ngOnChanges() {
    if (isEmpty(this.target)) {
      this.postingsList = [];
      return;
    }

    this._displayEditor = false;

    this.store.getPostingsList(this.target.uid)
      .subscribe(x => this.postingsList = x);
  }


  onCreate(data: Posting) {
    if (!data) {
      return;
    }

    this.store.createPosting(this.target.uid, data)
      .subscribe(x => {
        this.postingsList.push(x),
        this.selected = x;
        this._displayEditor = false;
      });
  }

  onSelect(posting: Posting) {
    this.selected = posting;
  }


  showEditor() {
    return (!this.readonly || this._displayEditor);
  }


  setEditor(value: boolean) {
    this._displayEditor = value;
  }


  isSelected(posting: Posting) {
    return (this.selected.uid === posting.uid);
  }

  showDocument(fileName: string): void {
    const url = `https://talanza.azurewebsites.net/documents-library/advice/${fileName}`;

    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }
}
