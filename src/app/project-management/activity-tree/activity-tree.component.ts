/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Assertion } from 'empiria';

import { ActivityService, ActivityTreeService } from '@app/services/project-management';

import { Activity, Activity_Empty, ActivityFilter } from '@app/models/project-management';


@Component({
  selector: 'activity-tree',
  templateUrl: './activity-tree.component.html',
  styleUrls: ['./activity-tree.component.scss'],
})
export class ActivityTreeComponent {

  activityTree: Activity[] = [];
  selectedActivity: Activity = Activity_Empty;
  dragZoneItem = null;

  addFirstActivityEditorVisible = false;
  insertActivityEditorVisible = false;

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

  @Output() onSelectActivity = new EventEmitter<Activity>();

  constructor(private activityTreeService: ActivityTreeService,
              private activityService: ActivityService) { }


  activityNameClass(level: number): string {
    if (1 <= level && level <= 6) {
      return `activity-name-level-${level}`;
    } else {
      return 'activity-name-level-6';
    }
  }


  get hasSelectedActivities() {
    return (this.selectedActivity.uid !== '');
  }


  insertActivity(name: string, position?: number) {
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


  hideInlineEditors() {
    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;
  }


  isActivitySelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }


  selectActivity(activity: Activity, emitEvent: boolean = false) {
    this.selectedActivity = activity;

    if (emitEvent) {
      this.onSelectActivity.emit(activity);
    }
  }


  showInitialActivityInlineEditor() {
    this.hideInlineEditors();

    if (this.hasSelectedActivities) {
      this.insertActivityEditorVisible = true;
    } else {
      this.addFirstActivityEditorVisible = true;
    }
  }

  // Drag & drop methods

  allowDrop(event: DragEvent, dragZoneItem: any) {
    this.configureDragEventBehaviour(event);

    this.setDragZoneItem(dragZoneItem);
  }


  setDragZoneItem(dragZoneItem: any) {
    this.dragZoneItem = dragZoneItem;
  }


  startDrag(event: DragEvent, activity: Activity) {
    this.hideInlineEditors();

    this.selectActivity(activity);

    event.srcElement.parentElement.classList.add("dragged");

    event.dataTransfer.dropEffect = "move";

    event.dataTransfer.setData("activity", JSON.stringify(activity));
  }


  moveActivity(event: DragEvent, newPosition: number) {
    let activity = this.getDraggedActivity(event);

    this.configureDragEventBehaviour(event);
    this.setDragZoneItem(null);

    this.activityTreeService.moveActivity(activity, newPosition)
                            .then( () => this.loadActivitiesTree() )
                            .catch( response => console.log(response.error.message) );
  }

  moveActivityAsChildOf(event: DragEvent, newParent: Activity) {
    let activity = this.getDraggedActivity(event);

    this.configureDragEventBehaviour(event);
    this.setDragZoneItem(null);

    this.activityTreeService.changeParent(activity, newParent)
                            .then( () => this.loadActivitiesTree() )
                            .catch( response => console.log(response.error.message) );
  }

  // private methods

  private configureDragEventBehaviour(event: DragEvent): any {
    event.stopPropagation();
    event.preventDefault();
  }


  private initialize() {
    this.activityTree = [];
    this.selectedActivity = Activity_Empty;

    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;
  }


  private getDraggedActivity(event: DragEvent): Activity {
    this.configureDragEventBehaviour(event);

    let activity = JSON.parse(event.dataTransfer.getData("activity"));

    return activity;
  }


  private hideSpinner() {
    // ToDo: call spinner component
  }


  private loadActivitiesTree() {
    Assertion.assertValue(this.filter.project, "this.filter.project");

    this.activityTreeService.getActivitiesTree(this.filter.project.uid)
                            .subscribe( x => this.activityTree = x );
  }


  private showSpinner() {
    // ToDo: call spinner component
  }

}
