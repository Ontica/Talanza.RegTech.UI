/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';

import { ProjectModel } from '@app/store/project.store';

import { Activity, EmptyActivity, ActivityOperation } from '@app/models/project-management';

import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MoveActivityDialogComponent } from '../move-activity-dialog/move-activity-dialog.component';

import { TimelineHelper } from '../common/timeline-helper';
import { sanitizeResourceUrl } from '@angular/core/src/sanitization/sanitization';



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

    const activity =  event.item.data as Activity;
    const newPosition = event.currentIndex < event.previousIndex ?
                                             event.currentIndex + 1 : event.currentIndex + 2;

    this.moveActivity(activity, newPosition);
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

  private moveActivity(activity: Activity, newPosition: number) {
    this.edited.emit({ operation: 'moveActivity',
                       activity: activity,
                       newPosition: newPosition
                     });
  }


  private moveActivityAsChildOf(activity: Activity, newParent: Activity) {
    this.edited.emit({ operation: 'changeParent',
                       activity: activity,
                       newParent: newParent
                     });
  }

}
