/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Input } from '@angular/core';

import { DataObject } from '@app/models/data-objects';

import { DataFormService } from '@app/services/data-objects';


@Component({
  selector: 'emp-data-file-generator',
  templateUrl: './data-file-generator.component.html',
  styleUrls: ["../../../styles/general-styles.scss"],
})
export class DataFileGeneratorComponent implements OnInit {

  @Input() dataObject: DataObject;

  fileToUpload: File = null;

  constructor(private service: DataFormService) { }

  ngOnInit(): void {
  }

  generateFile() {
    this.service.generateAutofillFile(this.dataObject)
                .then(x => this.dataObject = x);
  }

  deleteUploadedFile() {
    this.service.removeUploadedFile(this.dataObject)
        .then(x => this.dataObject = x);
  }

  discardFile() {
    this.service.discardAutofillFile(this.dataObject)
        .then(x => this.dataObject = x);
  }

  uploadFile() {
    this.service.uploadFile(this.dataObject, this.fileToUpload)
        .then(x => this.dataObject = x);

  }


  handleFileInput(file: File | null) {
    this.fileToUpload = file;
  }

}
