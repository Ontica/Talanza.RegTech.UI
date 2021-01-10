/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ActivityTemplate } from '@app/models/project-management';
import { ProjectTemplateModel, ProjectTemplateStore } from '@app/store/project-template.store';


@Component({
  selector: 'emp-steps-export-processes-dialog',
  templateUrl: './export-processes-dialog.component.html'
})
export class ExportProcessesDialogComponent {

  project: ProjectTemplateModel;
  activities: ActivityTemplate[] = [];

  excelFileUrl = '';
  working = false;

  constructor(private templateStore: ProjectTemplateStore,
              private dialogRef: MatDialogRef<ExportProcessesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {

    this.project = data as ProjectTemplateModel;
    this.activities = this.project.activities.filter((x) => x.level <= 2)
                                              .toArray();
  }


  close() {
    this.dialogRef.close();
  }


  export(selectedBranchUID: string) {
    this.excelFileUrl = '';

    let branch: ActivityTemplate;

    if (selectedBranchUID !== 'export-all') {
      branch = this.activities.find((x) => x.uid === selectedBranchUID);
    }

    this.working = true;

    this.templateStore.exportToExcel(this.project.project, branch)
      .then((x) => {
          this.excelFileUrl = x;
          this.working = false;
      });
  }

}
