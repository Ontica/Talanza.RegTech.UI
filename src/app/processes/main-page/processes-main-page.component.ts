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
import { NavigationHeader, MenuItem } from '@app/models/user-interface';
import { isEmpty } from '@app/models/core';


@Component({
  selector: 'emp-steps-processes-main-page',
  templateUrl: './processes-main-page.component.html',
  styleUrls: ['./processes-main-page.component.scss']
})
export class ProcessesMainPageComponent implements OnInit, OnDestroy {

  currentView: string;
  displayEditor = false;
  toggleEditor = false;

  model: ProjectTemplateModel;
  selectedActivityTemplate = EmptyActivityTemplate;

  private subs1: Subscription;
  private subs2: Subscription;

  constructor(public store: ProjectTemplateStore,
              public uiStore: UserInterfaceStore) { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.currentView = x
    );

    this.setNavigationHeader();

    this.subs2 = this.store.selectedTemplate().subscribe (
      x => {
        if (!isEmpty(x.project)) {
          if (this.model && this.model.project.uid !== x.project.uid) {
            this.displayEditor = false;
          }
          this.uiStore.setMainTitle(x.project.name);
        }
        this.model = x;
      }
    );
  }


  ngOnDestroy(): void {
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

    this.toggleEditor = !this.toggleEditor;
  }

  onProcessDiagramEdited(event: any) {

  }


  onProcessSelected(process: ProjectTemplate) {
    this.store.selectTemplate(process);
  }


  showEditor(activityTemplate: ActivityTemplate) {
    if (activityTemplate) {
      this.selectedActivityTemplate = activityTemplate;

      const lastValue = this.displayEditor;

      this.displayEditor = true;

      if (lastValue !== this.displayEditor) {
        this.toggleEditor = !this.toggleEditor;
      }
    }
  }

  // private methods


  private setNavigationHeader() {
    const header: NavigationHeader = {
      title: 'Please select a regulatory process',
      hint: 'Regulatory process designer',
      mainMenu: [
        new MenuItem('Obligations Tree', undefined, '/regulatory-processes/obligations-tree'),
        new MenuItem('Process diagram', undefined, '/regulatory-processes/process-diagram')
      ]
    };

    this.uiStore.setNavigationHeader(header);
  }

}
