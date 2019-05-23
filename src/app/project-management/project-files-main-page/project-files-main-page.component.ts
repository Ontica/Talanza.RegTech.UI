/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';

import { FileStore } from '@app/store/file.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { ProjectItemFile, ProjectItemFilter, EmptyProjectItemFilter } from '@app/models/project-management';
import { View } from '@app/models/user-interface';
import { isEmpty } from '@app/models/core';



@Component({
  selector: 'emp-steps-project-files-main-page',
  templateUrl: './project-files-main-page.component.html',
  styleUrls: ['./project-files-main-page.component.scss']
})
export class ProjectFilesMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  toggleEditor = false;

  files: Observable<ProjectItemFile[]> = of([]);

  selectedFile: ProjectItemFile;

  filter: ProjectItemFilter = EmptyProjectItemFilter;

  private subs1: Subscription;
  private subs2: Subscription;


  constructor(private fileStore: FileStore,
              private uiStore: UserInterfaceStore)  { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      value => {
        this.currentView = value;
        this.loadFiles();
      }
    );

    this.subs2 = this.uiStore.getValue<ProjectItemFilter>('Sidebar.ProjectFilter').subscribe(
      value => {
        this.filter = value;
        this.loadFiles();
      }
    );
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
    if (this.subs2) {
      this.subs2.unsubscribe();
    }
  }


  onEditorClosed() {
    this.displayEditor = false;

    this.toggleEditor = !this.toggleEditor;
  }


  showEditor(file: ProjectItemFile) {
    if (file) {
      this.selectedFile = file;

      const lastValue = this.displayEditor;

      this.displayEditor = true;

      if (lastValue !== this.displayEditor) {
        this.toggleEditor = !this.toggleEditor;
      }
    }
  }

  // private methods


  private loadFiles() {
    if (this.currentView.name === 'Project.Files' &&
               !isEmpty(this.filter.selectedProject)) {
      this.files = this.fileStore.projectFiles(this.filter.selectedProject);

    } else if (this.currentView.name === 'Projects.Files') {
      this.files = this.fileStore.allFiles();
    }
  }

}
