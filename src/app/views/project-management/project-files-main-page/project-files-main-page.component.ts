/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { FileStore } from '@app/store/file.store';

import { ProjectItemFile } from '@app/models/project-management';

import { FileToUpload } from '@app/models/knowledge-base';

import { View } from '@app/views/main-layout';

import { isEmpty } from '@app/core/data-types';

import { MainSidebarValues, DefaultSidebarValues} from '@app/views/main-layout';

import { MainUIStateSelector } from '@app/core/presentation/presentation-types';


@Component({
  selector: 'emp-steps-project-files-main-page',
  templateUrl: './project-files-main-page.component.html',
  styleUrls: ['./project-files-main-page.component.scss']
})
export class ProjectFilesMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayFileEditor = false;
  displayProjectItemEditor = false;
  useForeignLanguage = false;

  files: Observable<ProjectItemFile[]> = of([]);

  selectedFile: ProjectItemFile;

  filter: MainSidebarValues = DefaultSidebarValues;

  private subscriptionHelper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer, private fileStore: FileStore) {
    this.subscriptionHelper = this.uiLayer.createSubscriptionHelper();
  }

  ngOnInit() {
    this.subscriptionHelper.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(value => {
        this.currentView = value;
        this.loadFiles();
      });

    this.subscriptionHelper.select<MainSidebarValues>(MainUIStateSelector.SIDEBAR_VALUES)
      .subscribe(
        value => {
          this.filter = value;
          this.loadFiles();
        }
      );

    this.subscriptionHelper.select<boolean>(MainUIStateSelector.USE_FOREIGN_LANGUAGE)
      .subscribe(x => this.useForeignLanguage = x);
  }

  ngOnDestroy() {
    this.subscriptionHelper.destroy();
  }

  applyKeywordsFilter(keywords: string) {
    this.filter = {...this.filter, keywords: keywords };
  }

  onFileEditorClose() {
    this.displayFileEditor = false;
  }

  onProjectEditorClose() {
     this.displayProjectItemEditor = false;
  }

  onMediaFileViewerSave(file: FileToUpload) {

  }

  showFileEditor(file: ProjectItemFile) {
    if (file) {
      this.selectedFile = file;
      this.displayFileEditor = true;
      this.displayProjectItemEditor = false;
    }
  }

  showProjectItemEditor(file: ProjectItemFile) {
    if (file) {
      this.selectedFile = file;
      this.displayFileEditor = false;
      this.displayProjectItemEditor = true;
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
