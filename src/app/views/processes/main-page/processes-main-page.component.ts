/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PresentationLayer, SubscriptionHelper } from '@app/core/presentation';

import { isEmpty } from '@app/core/data-types';

import { ProjectTemplateStore, ProjectTemplateModel } from '@app/store/project-template.store';

import { ActivityTemplate, ActivityTemplateOperation,
         EmptyActivityTemplate,
         ProjectTemplate, } from '@app/models/project-management';

import { View } from '@app/views/main-layout';

import { MainUIStateAction, MainUIStateSelector } from '@app/core/presentation/presentation-types';


@Component({
  selector: 'emp-steps-processes-main-page',
  templateUrl: './processes-main-page.component.html',
  styleUrls: ['./processes-main-page.component.scss']
})
export class ProcessesMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  useForeignLanguage = false;

  model: ProjectTemplateModel;
  selectedActivityTemplate = EmptyActivityTemplate;

  private subs: Subscription;

  private subscriptionHelper: SubscriptionHelper;

  constructor(private uiLayer: PresentationLayer,
              public store: ProjectTemplateStore) {
    this.subscriptionHelper = uiLayer.createSubscriptionHelper();
  }


  ngOnInit() {
    this.subscriptionHelper.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.onViewChanged(x));

    this.subscriptionHelper.select<boolean>(MainUIStateSelector.USE_FOREIGN_LANGUAGE)
      .subscribe(x => this.useForeignLanguage = x);

    this.subs = this.store.selectedTemplate().subscribe (
      x => this.onModelSelected(x)
    );
  }


  ngOnDestroy() {
    this.subscriptionHelper.destroy();
    if (this.subs) {
      this.subs.unsubscribe();
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
      this.uiLayer.dispatch(MainUIStateAction.SET_MAIN_TITLE, this.currentView.title);
    }
    this.model = x;
  }


  private onViewChanged(view: View) {
    this.currentView = view;

    if (!this.model) {
      this.uiLayer.dispatch(MainUIStateAction.SET_MAIN_TITLE, 'Please select a process');
    }
  }

}
