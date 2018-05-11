/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Assertion } from 'empiria';

import { Activity, EmptyActivity } from '../data-types/activity';
import { ActivityFilter } from '../data-types/activity-filter';

import { ActivityTreeService } from '../services/activity.tree.service';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'activity-tree',
  templateUrl: './activity-tree.component.html',
  styleUrls: ['./activity-tree.component.scss'],
  providers: [ActivityTreeService, ActivityService]
})
export class ActivityTreeComponent {

  public activityTree: Activity[] = [];
  public selectedActivity: Activity = EmptyActivity();

  public addFirstActivityEditorVisible = false;
  public insertActivityEditorVisible = false;

  public dragging = false;

  private _filter: ActivityFilter = new ActivityFilter();
  @Input()
  set filter(filter: ActivityFilter) {

    this.initialize();

    if ((filter && filter.project &&  filter.project.uid)) {
      this._filter = filter;

      this.loadActivitiesTree();
    }
  }
  get filter(): ActivityFilter {
    return this._filter;
  }

  @Output() public onSelectActivity = new EventEmitter<Activity>();

  constructor(private activityTreeService: ActivityTreeService,
              private activityService: ActivityService) { }


  public get hasSelectedActivities() {
    return (this.selectedActivity.uid !== '');
  }


  public isActivitySelected(activity: Activity) {
    return (activity.uid === this.selectedActivity.uid);
  }


  public selectActivity(activity: Activity, emitEvent: boolean = false): void {
    this.selectedActivity = activity;

    if (emitEvent) {
      this.onSelectActivity.emit(activity);
    }
  }


  public hideInlineEditors() {
    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;
  }


  public showInitialActivityInlineEditor(): void {
    this.hideInlineEditors();

    if (this.hasSelectedActivities) {
      this.insertActivityEditorVisible = true;
    } else {
      this.addFirstActivityEditorVisible = true;
    }
  }


  public insertActivity(name: string, position?: number) {
    if (!name) {
      return;
    }

    const activity = {
      name: name,
      position: position ? position + 1 : 1
    };

    this.activityTreeService.insertActivity(this.filter.project.uid, activity)
                            .then( () => {
                                this.hideInlineEditors();
                                this.loadActivitiesTree();
                            });
  }


  public moveActivity(event: any, newPosition: number): void {
    let activity = this.getSourceActivity(event);

    this.activityTreeService.moveActivity(activity, newPosition)
                            .then( () => this.loadActivitiesTree() );
  }


  public moveActivityAsChildOf(event: any, newParent: Activity): void {
    let activity = this.getSourceActivity(event);

    this.activityTreeService.changeParent(activity, newParent)
                            .then( () => this.loadActivitiesTree() );


  }


  public deleteActivity(activity: Activity): void {
    if (!activity) {
      return;
    }

    this.activityTreeService.deleteActivity(this.filter.project.uid, activity)
                            .then( () => this.loadActivitiesTree() );
  }


  public activityNameClass(level: number): string {
    if (1 <= level && level <= 6) {
      return `activity-name-level-${level}`;
    } else {
      return 'activity-name-level-6';
    }
  }

  public allowDrop(ev: any): void {
    if (!this.dragging) {
      return;
    }

    ev.preventDefault();
  }


  public drag(ev: any, data: any): void {
    ev.dataTransfer.setData("data", JSON.stringify(data));
  }


  public startDrag(activity: Activity): void {
    this.hideInlineEditors();

    this.selectActivity(activity);

    this.dragging = true;
  }


  private getSourceActivity(ev: any): Activity {
    ev.preventDefault();

    this.dragging = false;

    let activity = JSON.parse(ev.dataTransfer.getData("data"));

    return activity;
  }

  private loadActivitiesTree() {
    Assertion.assertValue(this.filter.project, "this.filter.project");

    this.activityTreeService.getActivitiesTree(this.filter.project.uid)
                            .subscribe( (x) => this.activityTree = x );
  }


  private initialize() {
    this.activityTree = [];
    this.selectedActivity = EmptyActivity();

    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;
    this.dragging = false;
  }

}
