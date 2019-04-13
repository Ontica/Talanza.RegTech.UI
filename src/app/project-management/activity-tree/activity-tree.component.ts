/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { ProjectModel } from '@app/store/project.store';

import { isEmpty } from '@app/models/core';
import { Activity, EmptyActivity, ActivityOperation } from '@app/models/project-management';

import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MoveActivityDialogComponent } from '../move-activity-dialog/move-activity-dialog.component';

import { TimelineHelper } from '../common/timeline-helper';


@Component({
  selector: 'emp-steps-activity-tree',
  templateUrl: './activity-tree.component.html',
  styleUrls: ['./activity-tree.component.scss'],
})
export class ActivityTreeComponent implements OnChanges {

  selectedActivity: Activity = EmptyActivity;
  dragZoneItem = null;

  addFirstActivityEditorVisible = false;
  insertActivityEditorVisible = false;

  @Input() project: ProjectModel;
  @Input() templateDesignerMode: boolean;

  @Output() activitySelected = new EventEmitter<Activity>();
  @Output() edited = new EventEmitter<ActivityOperation>();

  constructor(private dialog: MatDialog) { }


  ngOnChanges() {
    if (this.selectedActivity.project.uid !== this.project.project.uid) {
      this.selectedActivity = EmptyActivity;
    }
  }


  get hasSelectedActivities() {
    return (this.selectedActivity.uid !== '');
  }


  get timelineHelper() {
    return TimelineHelper;
  }


  dropActivity(event: CdkDragDrop<string[]>) {
    if (event.currentIndex === event.previousIndex) {
      event.item.reset();
      return;
    }

    const activity = event.item.data as Activity;
    const newPosition = event.currentIndex < event.previousIndex ?
                                             event.currentIndex + 1 : event.currentIndex + 2;

    this.moveActivity(activity, newPosition);
  }


  isIndentable(activity: Activity): boolean {
    try {
      if (activity.position === 1) {
        return false;
      }

      const previous = this.project.activities.find(x => x.position === activity.position - 1);

      if (!previous) {
        console.log('No Previous in isIndentable', activity);
        return false;
      }

      if (activity.level > previous.level) {
        return false;
      }

      return true;
    } catch (e) {
      console.log('isIndentable error', e, activity);
      return false;
    }
  }


  isOutdentable(activity: Activity): boolean {
    try {
      if (activity.level === 1) {
        return false;
      }

      const previous = this.project.activities.find(x => x.position === activity.position - 1);

      if (!previous) {
        console.log('Undefined "previous" in isOutdentable', activity);
        return false;
      }


      if (activity.level < previous.level || previous.level === 1) {
        return false;
      }

      const hasNextSiblings = this.project.activities.find(x => x.position > activity.position &&
                                                           x.parent.uid === activity.parent.uid);

      if (hasNextSiblings) {
        return false;
      }

      return true;
    } catch (e) {
      console.log('isOutdentable error', e, activity);
      return false;
    }
  }



  indentActivity(activity: Activity) {
    if (!this.isIndentable(activity)) {
      return;
    }

    const previous = this.project.activities.find(x => x.position === activity.position - 1);

    if (previous.level === activity.level) {
      this.changeActivityParent(activity, previous);
      return;
    }

    const previousParent = this.project.activities.find(x => x.uid === previous.parent.uid);
    if (previousParent) {
      this.changeActivityParent(activity, previousParent);
    }
  }



  outdentActivity(activity: Activity) {
    if (!this.isOutdentable(activity)) {
      return;
    }

    const previous = this.project.activities.find(x => x.position === activity.position - 1);
    const previousParent = this.project.activities.find(x => x.uid === previous.parent.uid);

    if (!previousParent) {
      console.log('Undefined "previousParent" in outdentActivity', activity);
      return;
    }

    this.changeActivityParent(activity, previousParent);
  }


  insertActivity(name: string, position?: number) {
    if (!name) {
      return;
    }

    // ToDo: Avoid send the request multiple times.
    //       Use a spinner and block the command
    //       Use a command processor (as a front controller)?
    //       For now this.hideInlineEditors() avoids multiple calls

    this.hideInlineEditors();

    const newActivity = {
      name: name,
      position: position ? position + 1 : 1
    };

    this.edited.emit({ operation: 'insertActivity',
                       activity: newActivity
                     });
  }


  hideInlineEditors() {
    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;
  }


  isActivitySelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }


  onSelectActivity(activity: Activity, emitEvent: boolean = false) {
    this.selectedActivity = activity;

    if (emitEvent) {
      this.activitySelected.emit(activity);
    }
  }


  openAddEventDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px',
    dialogConfig.width = '600px',

    this.dialog.open(AddEventDialogComponent, dialogConfig);
  }


  openCopyOrMoveActivityDialog(activity: Activity) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px',
    dialogConfig.width = '600px',
    dialogConfig.data = activity;

    const dialogRef = this.dialog.open(MoveActivityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        result => {
        if (result) {
          this.edited.emit(result as ActivityOperation);
        }
      }
    );

  }


  showInitialActivityInlineEditor() {
    this.hideInlineEditors();

    if (this.hasSelectedActivities) {
      this.insertActivityEditorVisible = true;
    } else {
      this.addFirstActivityEditorVisible = true;
    }
  }


  // private methods


  private changeActivityParent(activity: Activity, newParent: Activity) {
    this.edited.emit({ operation: 'changeParent',
                       activity: activity,
                       newParent: newParent
                     });
  }


  private moveActivity(activity: Activity, newPosition: number) {
    this.edited.emit({ operation: 'moveActivity',
                       activity: activity,
                       newPosition: newPosition
                     });
  }

}
