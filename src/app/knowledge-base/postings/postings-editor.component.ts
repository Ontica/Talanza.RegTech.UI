/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import {
  FormBuilder, FormControl,
  FormGroup, Validators
} from '@angular/forms';

import { Identifiable, Empty } from '@app/models/core';
import { Posting, EmptyPosting } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-postings-editor',
  templateUrl: './postings-editor.component.html',
  styleUrls: ['./postings-editor.component.scss']
})
export class PostingsEditorComponent implements OnInit {

  form: FormGroup;

  @Input() target: Identifiable = Empty;
  @Output() edit = new EventEmitter<any>();

  posting = EmptyPosting;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.target) {
      this.posting = EmptyPosting;
    }
    this.createFormGroup();
  }


  onInsert(posting: Posting) {

  }


  onSave() {
    if (!this.form.valid) {
      return;
    }
    const data = this.getFormData();

    this.edit.emit(data);
    this.reset();
  }


  // private methods

  private createFormGroup() {
    const formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      fileName: new FormControl('')
    });

    this.form = formGroup;
  }


  private getFormData() {
    const formModel = this.form.value;

    return {
      title: formModel.title,
      body: formModel.body,
      fileName: formModel.fileName
    };
  }


  private reset() {
    this.createFormGroup();
  }

}
