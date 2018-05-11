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

  public activityTree: Activity[] = [];
  public selectedActivity: Activity = EmptyActivity();

  public addChildEditorVisible = false;
  public addFirstActivityEditorVisible = false;
  public insertActivityEditorVisible = false;

  public dragging = false;

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
    this.addChildEditorVisible = false;
    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;  
  }


  public toggleAddChildEditor(activity: Activity): void {
    this.selectActivity(activity);    

    const newState = !this.addChildEditorVisible;

    this.hideInlineEditors();

    this.addChildEditorVisible = newState;
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

    this.activityTreeService.insertActivity(this.filter.project, activity)
                            .then( () => {
                                this.hideInlineEditors();
                                this.refreshData();
                            });
  }


  public createChildActivity(name: string, parent: Activity): void {
    if (!name) {
      return;
    }

    const newActivity = {
      name: name,
      parent: parent
    };

    this.activityTreeService.insertAsChild(this.filter.project, newActivity)
                            .then( () =>  {
                              this.hideInlineEditors();
                              this.refreshData();
                            });
  }


  public moveActivity(event: any, newPosition: number): void {

    let activity = this.getSourceActivity(event);

    newPosition++;
 
    this.activityTreeService.moveActivity(activity, newPosition)                            
                            .then( (x) => this.refreshActivityTree() );
  }


  public moveActivityAsChildOf(event: any, newParent: Activity): void {
    let activity = this.getSourceActivity(event);

    this.activityTreeService.changeParent(activity, newParent)
                            .then( () => this.refreshActivityTree() );

    
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

        this.activityTree = data;

        this.activityTree.forEach(function (e) {
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
    if (!this.dragging) {
      return;
    }

    ev.preventDefault();
  }

  public drag(ev: any, data: any): void {
    ev.dataTransfer.setData("data", JSON.stringify(data));
  }

  public startDrag(): void {
    this.dragging = true;
  }

  public getSourceActivity(ev: any): Activity {
    ev.preventDefault();

    this.dragging = false;

    let activity = JSON.parse(ev.dataTransfer.getData("data"));

    return activity;
  }

  private refreshActivityTree(): void {
    this.activityService.getActivities(this.filter.project)
                        .then( (x) => this.activityTree = x );
  }

}
