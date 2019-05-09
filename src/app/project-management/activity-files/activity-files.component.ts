/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Activity, EmptyActivity } from '@app/models/project-management';
import { ProjectService } from '@app/services/project-management';


@Component({
  selector: 'emp-steps-activity-files',
  templateUrl: './activity-files.component.html',
  styleUrls: ['./activity-files.component.scss']
})
export class ActivityFilesComponent {

  @Input() activity: Activity = EmptyActivity;


  fileToUpload: File = null;

  form = new FormGroup( {
    file: new FormControl(''),
    title: new FormControl(''),
    notes: new FormControl(''),
    tags: new FormControl(''),
    authors: new FormControl('')
  });

  constructor(private projectService: ProjectService) { }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  removeFile() {
    this.fileToUpload = null;
  }


  uploadFileToActivity() {
    this.projectService.uploadFile(this.activity, this.fileToUpload)
    .subscribe(x => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  onSubmit(): void {

  }

}
