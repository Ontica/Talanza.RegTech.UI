/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { ProjectTemplateStore, ProjectTemplateModel } from '@app/store/project-template.store';

import { Activity, Activity_Empty, ActivityOperation } from '@app/models/project-management';


@Component({
  selector: 'templates-main-page',
  templateUrl: './templates-main-page.component.html',
  styleUrls: ['./templates-main-page.component.scss']
})
export class TemplatesMainPageComponent implements OnInit {

  selectedTemplate: ProjectTemplateModel;
  selectedActivity = Activity_Empty;

  displayEditor = false;
  toggleEditor = false;

  constructor(private store: ProjectTemplateStore) { }


  ngOnInit() {

    this.store.selectedTemplate().subscribe (
      x => this.selectedTemplate = x
    );
  }


  onActivityUpdated(activity: Activity) {

  }


  onActivityTreeEdited(event: ActivityOperation) {
    switch (event.operation) {

      case 'createActivity':

        this.store.insertActivity(this.selectedTemplate.project, event.activity)
                  .then( x => this.selectedActivity = x )
                  .catch( response => console.log(response.error.message) );

        return;

      case 'moveActivity':

        this.store.moveActivity(event.activity as Activity, event.newPosition)
                  .catch( response => console.log(response.error.message) );

        return;

      case 'changeParent':

        this.store.changeParent(event.activity as Activity, event.newParent)
                  .catch( response => console.log(response.error.message) );

        return;

      default:

        console.log('Unhandled operation name', event.operation);

    }

  }


  onEditorClosed() {
    this.displayEditor = false;

    this.toggleEditor = !this.toggleEditor;
  }


  showEditor(activity: Activity) {
    if (activity) {
      this.selectedActivity = activity;

      const lastValue = this.displayEditor;

      this.displayEditor = true;

      if (lastValue !== this.displayEditor) {
        this.toggleEditor = !this.toggleEditor;
      }
    }
  }

}
