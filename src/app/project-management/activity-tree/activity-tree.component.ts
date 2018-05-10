/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  public taskList: Activity[] = [];
  public selectedActivity: Activity = EmptyActivity();

  public selectedTaskUID = '';

  public addChildEditorVisible = false;
  public addFirstActivityEditorVisible = false;
  public insertActivityEditorVisible = false;

  public isDrag = false;

  private _filter: ActivityFilter = new ActivityFilter();
  @Input()
  set filter(filter: ActivityFilter) {
    if ((filter)) {
      this._filter = filter;

      this.refreshData();
    }

  }
  get filter(): ActivityFilter {
    return this._filter;
  }

  @Output() public onSelectActivity = new EventEmitter<Activity>();

  constructor(private activityTreeService: ActivityTreeService, 
              private activityService: ActivityService) { }


  public get hasSelectedActivities() {
    return this.selectedTaskUID !== '';
  }

  public isActivitySelected(activity: Activity) {
    return (activity.uid === this.selectedActivity.uid);
  }

  public selectActivity(activity: Activity): void {
    this.selectedActivity = activity;

    this.onSelectActivity.emit(activity);

    this.selectedTaskUID = activity.uid;
  }

  public hideInlineEditors() {
    this.addChildEditorVisible = false;
    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;  
  }

  public toggleAddChildEditor(activity: Activity): void {
    this.selectedTaskUID = activity.uid;

    const newState = !this.addChildEditorVisible;

    this.hideInlineEditors();

    this.addChildEditorVisible = newState;
  }

  public showInitialActivityInlineEditor(): void {
    this.hideInlineEditors();

    if (this.selectedTaskUID === '') {
      this.addFirstActivityEditorVisible = true;
    } else {
      this.insertActivityEditorVisible = true;
    }
  }

  public insertActivity(name: string, position?: number) {
    if (!name) {
      return;
    }
    if (position) {
      position = position + 1;
    } else {
      position = 1;
    }

    const activity = {
      name: name,
      position: position
    };

    this.activityTreeService.insertActivity(this.filter.project, activity)
                             .subscribe((x) => {
                                this.hideInlineEditors();
                                this.refreshData();
                             });
  }

  public createChildActivity(name: string, parent: Activity): void {
    if (!name) {
      return;
    }

    const child = {
      name: name,
      parent: parent
    };

    this.activityTreeService.createChild(this.filter.project, child)
                            .subscribe((x) => {
                                      this.hideInlineEditors();
                                      this.refreshData();
                            });
  }

  public moveActivity(ev: any, position: number): void {

    let sourceActivity = this.getSourceActivity(ev);    

    position++;

    this.setNewPositionToActivity(sourceActivity, position);
  }


  public moveActivityAsChildOf(ev: any, parentUID: string): void {
    let sourceActivity = this.getSourceActivity(ev);

    this.setNewParentToActivity(sourceActivity, parentUID);
  }

  public deleteTask(taskUID: string): void {
    if (!taskUID) {
      return;
    }

    this.activityService.deleteActivity(this.filter.project, taskUID)
      .subscribe((x) => { this.refreshData(); });
  }

  public activityNameClass(level: number): string {
    switch (level) {
      case 1:
        return 'activity-name-level-1';

      case 2:
        return 'activity-name-level-2';

      case 3:
        return 'activity-name-level-3';

      default:
        return 'activity-name-level-3';
    }

  }

  private async refreshData() {
    if (this.filter.project === '') {
      return;
    }
    await this.activityService.getActivities(this.filter.project)
      .then((data) => {

        this.taskList = data;

        this.taskList.forEach(function (e) {
          if (e.type === 'ObjectType.ProjectItem.Summary') {
            e.visible = 'collapse'

          } else if (e.type === 'ObjectType.ProjectItem.Activity' &&
            e.parent.uid === 'Empty') {
            e.visible = 'visible'

          } else {
            e.visible = 'visible'; //'none'
          }
        });
      });
  }

  public allowDrop(ev: any): void {
    if (!this.isDrag) {
      return;
    }

    ev.preventDefault();
  }

  public drag(ev: any, data: any): void {
    ev.dataTransfer.setData("data", JSON.stringify(data));
  }

  public startDrag(): void {
    this.isDrag = true;
  }

  public getSourceActivity(ev: any): Activity {
    ev.preventDefault();

    this.isDrag = false;

    let activity = JSON.parse(ev.dataTransfer.getData("data"));

    return activity;
  }

  private setNewPositionToActivity(sourceActivity: Activity, position: number): void {

    this.activityService.setNewPositionToActivity(sourceActivity.project.uid, sourceActivity.uid, position)
      .subscribe((x) => {
        this.reloadActivities();
      });
  }

  private setNewParentToActivity(sourceActivity: Activity, parentUID: string): void {

    this.activityService.setNewParentToActivity(sourceActivity.project.uid, sourceActivity.uid, parentUID)
      .subscribe((x) => {
        this.reloadActivities();
      });
  }

  private reloadActivities(): void {

    this.activityService.getActivities(this.filter.project)
      .then((data) => {
        let taskList = data;

        taskList.forEach((e) => {
          let index = this.taskList.findIndex((x) => x.uid === e.uid);
          e.visible = this.taskList[index].visible;
        });

        this.taskList = taskList;
      });

  }

}
