/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Activity, Project } from '@app/models/project-management';

import { ProjectStore } from '@app/store/project.store';


@Component({
  selector: 'emp-steps-export-activities-dialog',
  templateUrl: './export-activities-dialog.component.html',
  styleUrls: ['../../../../styles/general-styles.scss']
})
export class ExportActivitiesDialogComponent implements OnInit {

  project: Project;
  activities: Activity[] = [];

  excelFileUrl = '';
  working = false;

  constructor(private projectStore: ProjectStore,
              private dialogRef: MatDialogRef<ExportActivitiesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }


  ngOnInit() {
    this.projectStore.selectedProject().subscribe (
      (x) => {
        this.project = x.project;
        this.activities = x.activities.filter((y) => y.level <= 3);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }


  export(selectedBranchUID: string) {
    this.excelFileUrl = '';

    let branch: Activity;

    if (selectedBranchUID !== 'export-all') {
      branch = this.activities.find((x) => x.uid === selectedBranchUID);
    }

    this.working = true;

    this.projectStore.exportToExcel(this.project, branch)
      .then((x) => {
          this.excelFileUrl = x;
          this.working = false;
      });
  }

}
