/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Assertion } from 'empiria';

import { Activity, Activity_Empty } from '../data-types/activity';
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
  public selectedActivity: Activity = Activity_Empty;
  public dragZoneItem = null;

  public addFirstActivityEditorVisible = false;
  public insertActivityEditorVisible = false;

  private _filter: ActivityFilter = new ActivityFilter();


  @Input()
  set filter(filter: ActivityFilter) {

    this.initialize();

    if ((filter && filter.project && filter.project.uid)) {
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

    // ToDo: Avoid send the request multiple times.
    //       Use a spinner and block the command
    //       Use a command processor (as a front controller)?
    //       For now this.hideInlineEditors() avoids multiple calls

    this.showSpinner();

    this.hideInlineEditors();

    const activity = {
      name: name,
      position: position ? position + 1 : 1
    };

    this.activityTreeService.insertActivity(this.filter.project.uid, activity)
      .then((x) => {
        this.loadActivitiesTree();
        this.hideSpinner();
        this.selectActivity(x);
      });
  }

  public deleteActivity(activity: Activity): void {
    if (!activity) {
      return;
    }

    this.activityTreeService.deleteActivity(this.filter.project.uid, activity)
      .then(() => this.loadActivitiesTree());
  }


  public activityNameClass(level: number): string {
    if (1 <= level && level <= 6) {
      return `activity-name-level-${level}`;
    } else {
      return 'activity-name-level-6';
    }
  }

  private loadActivitiesTree() {
    Assertion.assertValue(this.filter.project, "this.filter.project");

    this.activityTreeService.getActivitiesTree(this.filter.project.uid)
                            .subscribe((x) => this.activityTree = x);
  }


  private initialize() {
    this.activityTree = [];
    this.selectedActivity = Activity_Empty;

    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;
  }


  // Drag & drop methods

  public allowDrop(event: DragEvent, dragZoneItem: any): void {
    this.configureDragEventBehaviour(event);

    this.setDragZoneItem(dragZoneItem);
  }

  private configureDragEventBehaviour(event: DragEvent): any {
    event.stopPropagation();
    event.preventDefault();
  }

  public setDragZoneItem(dragZoneItem: any) {
    this.dragZoneItem = dragZoneItem;
  }

  public startDrag(event: DragEvent, activity: Activity): void {
    this.hideInlineEditors();

    this.selectActivity(activity);

    event.srcElement.parentElement.classList.add("dragged");

    event.dataTransfer.dropEffect = "move";

    event.dataTransfer.setData("activity", JSON.stringify(activity));
  }


  private getDraggedActivity(event: DragEvent): Activity {
    this.configureDragEventBehaviour(event);

    let activity = JSON.parse(event.dataTransfer.getData("activity"));

    return activity;
  }

  public moveActivity(event: DragEvent, newPosition: number): void {
    let activity = this.getDraggedActivity(event);

    this.configureDragEventBehaviour(event);
    this.setDragZoneItem(null);

    this.activityTreeService.moveActivity(activity, newPosition)
                            .then(() => this.loadActivitiesTree())
                            .catch(response => console.log(response.error.message));
  }


  public moveActivityAsChildOf(event: DragEvent, newParent: Activity): void {
    let activity = this.getDraggedActivity(event);

    this.configureDragEventBehaviour(event);
    this.setDragZoneItem(null);

    this.activityTreeService.changeParent(activity, newParent)
                            .then(() => this.loadActivitiesTree())
                            .catch(response => console.log(response.error.message));
  }

  // Spinner component calls

  private showSpinner() {
    // ToDo: call spinner component
  }

  private hideSpinner() {
    // ToDo: call spinner component
  }

}
