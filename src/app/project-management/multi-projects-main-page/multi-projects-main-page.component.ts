/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProjectStore } from '@app/store/project.store';
import { UserInterfaceStore } from '@app/store/ui.store';

import { Activity, EmptyActivity, Project } from '@app/models/project-management';

import { View } from '@app/models/user-interface';
import { Contact } from '@app/models/core';
import { TimelineHelper } from '../common/timeline-helper';


@Component({
  selector: 'emp-steps-multi-projects-main-page',
  templateUrl: './multi-projects-main-page.component.html',
  styleUrls: ['./multi-projects-main-page.component.scss']
})
export class MultiProjectsMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  toggleEditor = false;

  filteredActivities: Activity[] = [];
  selectedActivity = EmptyActivity;

  private allActivities: Activity[] = [];
  private projectsFilter: Project[] = [];
  private responsiblesFilter: Contact[] = [];
  private themesFilter: string[] = [];

  private subs1: Subscription;
  private subs2: Subscription;
  private subs3: Subscription;
  private subs4: Subscription;

  constructor(private projectStore: ProjectStore,
              private uiStore: UserInterfaceStore)  { }


  ngOnInit() {
    this.loadAllActivities();

    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.currentView = x
    );

    this.subs2 = this.uiStore.getValue<Project[]>('Sidebar.Selected.Projects').subscribe(
      x => {
        this.projectsFilter = x;
        this.applyFilters();
      }
    );

    this.subs3 = this.uiStore.getValue<Contact[]>('Sidebar.Selected.Responsibles').subscribe(
      x => {
        this.responsiblesFilter = x;
        this.applyFilters();
      }
    );

    this.subs4 = this.uiStore.getValue<string[]>('Sidebar.Selected.Themes').subscribe(
      x => {
        this.themesFilter = x;
        this.applyFilters();
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
    if (this.subs3) {
      this.subs3.unsubscribe();
    }
    if (this.subs4) {
      this.subs4.unsubscribe();
    }
  }


  onActivityUpdated(activity: Activity) {
    this.loadAllActivities()
        .then(() => this.updateSelectedActivity());
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

  // private methods


  private applyFilters() {
    let filtered = this.applyProjectsFilter(this.allActivities);

    filtered = this.applyResponsiblesFilter(filtered);
    filtered = this.applyThemesFilter(filtered);

    this.filteredActivities = filtered;
  }


  private applyProjectsFilter(source: Activity[]): Activity[] {
    if (!this.projectsFilter || this.projectsFilter.length === 0) {
      return source;
    }

    const uids = this.projectsFilter.map(x => x.uid);

    return source.filter(x => uids.includes(x.project.uid));
  }


  private applyResponsiblesFilter(source: Activity[]): Activity[] {
    if (!this.responsiblesFilter || this.responsiblesFilter.length === 0) {
      return source;
    }

    const uids = this.responsiblesFilter.map(x => x.uid);

    return source.filter(x => uids.includes(x.responsible.uid));
  }


  private applyThemesFilter(source: Activity[]): Activity[] {
    if (!this.themesFilter || this.themesFilter.length === 0) {
      return source;
    }

    return source.filter(x => this.themesFilter.includes(x.theme));
  }


  private loadAllActivities(): Promise<void> {
    return this.projectStore.getAllActivities()
              .toPromise()
              .then(x => {
                this.allActivities = x;
                this.applyFilters();
              });
  }


  private updateSelectedActivity() {
    if (!this.filteredActivities.find(x => x.uid === this.selectedActivity.uid)) {
      this.displayEditor = false;
      this.selectedActivity = EmptyActivity;
    }
  }

}
