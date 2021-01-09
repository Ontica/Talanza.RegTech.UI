/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StepsStore } from '@app/store/steps.store';
import { UserInterfaceStore } from '@app/views/main-layout/ui.store';

import { ActivityTemplate, ActivityTemplateOperation,
         EmptyActivityTemplate,
         ProjectTemplate, } from '@app/models/project-management';

import { View } from '@app/views/main-layout';

import { Process } from '@app/models/steps';


@Component({
  selector: 'emp-steps-main-page',
  templateUrl: './steps-main-page.component.html',
  styleUrls: ['./steps-main-page.component.scss']
})
export class StepsMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;

  processList: Process[] = [];

  selectedActivityTemplate = EmptyActivityTemplate;

  private subs1: Subscription;
  private subs2: Subscription;

  constructor(public store: StepsStore,
              public uiStore: UserInterfaceStore) { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.currentView = x
    );

    this.subs2 = this.store.processList().subscribe (
      x => this.processList = x
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
    console.log('catched activity edition event', event);

    return;

    // switch (event.operation) {
    //   case 'copyToProject':
    //     this.store.copyTo(event.activity as ActivityTemplate, event.targetProjectUID)
    //               .then(() => this.displayEditor = false)
    //               .catch(response => console.log(response.error.message));
    //     return;

    //   case 'insertActivity':
    //     this.store.insert(this.model.project, event.activity)
    //               .then(x => this.selectedActivityTemplate = x)
    //               .catch(response => console.log(response.error.message));
    //     return;

    //   case 'moveActivity':
    //     this.store.move(event.activity as ActivityTemplate, event.newPosition)
    //               .catch(response => console.log(response.error.message));
    //     return;

    //   case 'moveToProject':
    //     this.store.moveTo(event.activity as ActivityTemplate, event.targetProjectUID)
    //               .then(() => this.displayEditor = false)
    //               .catch(response => console.log(response.error.message));
    //     return;

    //   case 'changeParent':
    //     this.store.changeParent(event.activity as ActivityTemplate, event.newParent)
    //               .catch(response => console.log(response.error.message));
    //     return;

    //   default:
    //     console.log('Unhandled operation name', event.operation);
    // }
  }


  onEditorClosed() {
    this.displayEditor = false;
  }


  onProcessDiagramEdited(event: any) {

  }


  onProcessSelected(process: ProjectTemplate) {
    // this.store.selectTemplate(process);
  }


  showEditor(activityTemplate: ActivityTemplate) {
    if (activityTemplate) {
      this.selectedActivityTemplate = activityTemplate;
      this.displayEditor = true;
    }
  }

}
