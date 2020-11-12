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

  _showDeleteConfirm = false;

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


  listForPosting(data: Posting) {
    let list = data.sendTo.registered.map(x => x.name + '; ');

    return list + data.sendTo.additional;
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

  onDelete(posting: Posting) {
    this.selected = EmptyPosting();
    this.store.deletePosting(this.target.uid, posting.uid)
      .subscribe(x => {
        this.postingsList = x,
        this._displayEditor = false;
      });
  }


  onSelect(posting: Posting) {
    this.selected = posting;
  }


  onToggleDelete(posting: Posting) {
    this._showDeleteConfirm = !this._showDeleteConfirm;
    this.selected = posting;
  }

  showEditor() {
    return (!this.readonly || this._displayEditor);
  }


  showDeleteConfirm(posting: Posting) {
    return (this._showDeleteConfirm && this.selected.uid === posting.uid);
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
