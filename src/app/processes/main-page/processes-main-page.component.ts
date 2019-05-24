/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectTemplateStore, ProjectTemplateModel } from '@app/store/project-template.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { ActivityTemplate, ActivityTemplateOperation,
         EmptyActivityTemplate,
         ProjectTemplate, } from '@app/models/project-management';

import { View } from '@app/models/user-interface';

import { isEmpty } from '@app/models/core';


@Component({
  selector: 'emp-steps-processes-main-page',
  templateUrl: './processes-main-page.component.html',
  styleUrls: ['./processes-main-page.component.scss']
})
export class ProcessesMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;

  model: ProjectTemplateModel;
  selectedActivityTemplate = EmptyActivityTemplate;

  private subs1: Subscription;
  private subs2: Subscription;

  constructor(public store: ProjectTemplateStore,
              public uiStore: UserInterfaceStore) { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.onViewChanged(x)
    );

    this.subs2 = this.store.selectedTemplate().subscribe (
      x => this.onModelSelected(x)
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


  onActivityUpdated(activityTemplate: ActivityTemplate) {

  }


  onActivityTreeEdited(event: ActivityTemplateOperation) {
    switch (event.operation) {
      case 'copyToProject':
        this.store.copyTo(event.activity as ActivityTemplate, event.targetProjectUID)
                  .then(() => this.displayEditor = false)
                  .catch(response => console.log(response.error.message));
        return;

      case 'insertActivity':
        this.store.insert(this.model.project, event.activity)
                  .then(x => this.selectedActivityTemplate = x)
                  .catch(response => console.log(response.error.message));
        return;

      case 'moveActivity':
        this.store.move(event.activity as ActivityTemplate, event.newPosition)
                  .catch(response => console.log(response.error.message));
        return;

      case 'moveToProject':
        this.store.moveTo(event.activity as ActivityTemplate, event.targetProjectUID)
                  .then(() => this.displayEditor = false)
                  .catch(response => console.log(response.error.message));
        return;

      case 'changeParent':
        this.store.changeParent(event.activity as ActivityTemplate, event.newParent)
                  .catch(response => console.log(response.error.message));
        return;

      default:
        console.log('Unhandled operation name', event.operation);
    }
  }


  onEditorClosed() {
    this.displayEditor = false;
  }

  onProcessDiagramEdited(event: any) {

  }


  onProcessSelected(process: ProjectTemplate) {
    this.store.selectTemplate(process);
  }


  showEditor(activityTemplate: ActivityTemplate) {
    if (activityTemplate) {
      this.selectedActivityTemplate = activityTemplate;
      this.displayEditor = true;
    }
  }


  // private methods


  private onModelSelected(x: ProjectTemplateModel) {
    if (!isEmpty(x.project)) {
      if (this.model && this.model.project.uid !== x.project.uid) {
        this.displayEditor = false;
      }
      this.uiStore.setMainTitle(this.currentView.title);
    }
    this.model = x;
  }


  private onViewChanged(view: View) {
    this.currentView = view;

    if (!this.model) {
      this.uiStore.setMainTitle('Please select a process');
    }
  }

}
