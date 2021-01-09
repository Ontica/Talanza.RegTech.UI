/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PresentationLayer } from '@app/core/presentation';

import { StepsStore } from '@app/store/steps.store';

import { ActivityTemplate, ActivityTemplateOperation,
         EmptyActivityTemplate,
         ProjectTemplate, } from '@app/models/project-management';

import { View } from '@app/views/main-layout';

import { Process } from '@app/models/steps';

import { MainUIStateSelector } from '@app/core/presentation/presentation-types';


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

  constructor(private uiLayer: PresentationLayer,
              public store: StepsStore) { }

  ngOnInit() {
    this.subs1 = this.uiLayer.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.currentView = x);

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
  }


  onEditorClosed() {
    this.displayEditor = false;
  }


  onProcessDiagramEdited(event: any) {

  }


  onProcessSelected(process: ProjectTemplate) {

  }


  showEditor(activityTemplate: ActivityTemplate) {
    if (activityTemplate) {
      this.selectedActivityTemplate = activityTemplate;
      this.displayEditor = true;
    }
  }

}
