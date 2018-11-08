/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, OnChanges, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from "@angular/material";

import { ProjectModel } from '@app/store/project.store';

import { Activity, EmptyActivity, ActivityOperation } from '@app/models/project-management';

import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { MoveActivityDialogComponent } from '../move-activity-dialog/move-activity-dialog.component';


@Component({
  selector: 'activity-tree',
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

    this.edited.emit({ operation: 'createActivity',
                       activity: activity
                     });
  }


  hideInlineEditors() {
    this.addFirstActivityEditorVisible = false;
    this.insertActivityEditorVisible = false;
  }


  isActivitySelected(activity: Activity): boolean {
    return (activity.uid === this.selectedActivity.uid);
  }


  openCopyOrMoveActivityDialog(activity: Activity) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px',
    dialogConfig.width = '600px',
    dialogConfig.data = activity;

    var dialogRef = this.dialog.open(MoveActivityDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        result => {
        if (result) {
          this.edited.emit(result as ActivityOperation);
        }
      }
    );

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

    this.onSelectActivity(activity);

    event.srcElement.parentElement.classList.add("dragged");

    event.dataTransfer.dropEffect = "move";

    event.dataTransfer.setData("activity", JSON.stringify(activity));
  }

  moveActivity(event: DragEvent, newPosition: number) {
    let activity = this.getDraggedActivity(event);

    this.configureDragEventBehaviour(event);
    this.setDragZoneItem(null);

    this.edited.emit({ operation: 'moveActivity',
                       activity: activity,
                       newPosition: newPosition
                     });
  }


  moveActivityAsChildOf(event: DragEvent, newParent: Activity) {
    let activity = this.getDraggedActivity(event);

    this.configureDragEventBehaviour(event);
    this.setDragZoneItem(null);

    this.edited.emit({ operation: 'changeParent',
                       activity: activity,
                       newParent: newParent
                     });
  }

  // private methods

  private configureDragEventBehaviour(event: DragEvent): any {
    event.stopPropagation();
    event.preventDefault();
  }


  private getDraggedActivity(event: DragEvent): Activity {
    this.configureDragEventBehaviour(event);

    let activity = JSON.parse(event.dataTransfer.getData("activity"));

    return activity;
  }


  private hideSpinner() {
    // ToDo: call spinner component
  }


  private showSpinner() {
    // ToDo: call spinner component
  }

}
