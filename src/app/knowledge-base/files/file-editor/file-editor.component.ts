/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MediaFile, MediaMetadata, FileToUpload } from '@app/models/knowledge-base';


@Component({
  selector: 'emp-kb-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['../../../../styles/form.scss']
})
export class FileEditorComponent implements OnChanges {

  @Input() mediaFile: MediaFile;

  @Output() save = new EventEmitter<FileToUpload>();

  fileToUpload: File = null;

  form = new FormGroup( {
    type: new FormControl(''),
    title: new FormControl(''),
    summary: new FormControl(''),
    authors: new FormControl(''),
    tags: new FormControl(''),
    topics: new FormControl('')
  });


  ngOnChanges() {
    this.resetForm();
  }


  handleFileInput(file: File | null) {
    this.fileToUpload = file;
  }


  onSubmit(): void {

  }


  onUpload() {
    const data: FileToUpload = {
      file: this.fileToUpload,
      metadata: this.getMetadata()
    };

    this.save.emit(data);
  }


  private getMetadata(): MediaMetadata {
    const formModel = this.form.value;

    const data: MediaMetadata = {
      type: formModel.type,
      title: formModel.title,
      summary: formModel.summary,
      authors: formModel.authors,
      tags: formModel.tags,
      topics: formModel.topics
    };

    return data;
  }

  private resetForm() {
    const metadata = this.mediaFile.metadata;

    this.fileToUpload = null;

    this.form.reset({
      type: metadata.type,
      title: metadata.title,
      summary: metadata.summary,
      authors: metadata.authors,
      tags: metadata.tags,
      topics: metadata.topics
    });
  }

}
