/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { ProjectTemplateStore, ProjectTemplateModel } from '@app/store/project-template.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { ActivityTemplate, ActivityTemplateOperation,
         EmptyActivityTemplate, } from '@app/models/project-management';
import { NavigationHeader, MenuItem } from '@app/models/user-interface';
import { isEmpty } from '@app/models/core';

@Component({
  selector: 'emp-steps-processes-main-page',
  templateUrl: './processes-main-page.component.html',
  styleUrls: ['./processes-main-page.component.scss']
})
export class ProcessesMainPageComponent implements OnInit {

  model: ProjectTemplateModel;
  selectedActivityTemplate = EmptyActivityTemplate;

  displayEditor = false;
  toggleEditor = false;

  constructor(private uiStore: UserInterfaceStore,
              private store: ProjectTemplateStore) { }


  ngOnInit() {
    this.setNavigationHeader();

    this.store.selectedTemplate().subscribe (
      x => {
        this.model = x;

        if (!isEmpty(this.model.project)) {
          this.displayEditor = false;
          this.uiStore.setMainTitle(this.model.project.name);
        }
        this.model = x;
      }
    );
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
        new MenuItem('Processes', undefined, '/regulatory-processes'),
      ]
    };

    this.uiStore.setNavigationHeader(header);
  }

}
