/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output } from '@angular/core';

import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { ProjectModel } from '@app/store/project.store';

import { Activity, EmptyActivity, ActivityOperation } from '@app/models/project-management';

import { CollapsableTree, CollapsableTreeNodeDisplayMode } from '@app/views/project-management/common/collapsable-tree';

import { Process } from '@app/models/steps';


@Component({
  selector: 'emp-steps-list',
  templateUrl: './steps-list.component.html',
  styleUrls: ['./steps-list.component.scss'],
})
export class StepsListComponent {

  selectedActivity: Activity = EmptyActivity;

  addFirstActivityEditorVisible = false;
  insertActivityEditorVisible = false;

  @Input() processList: Process[];

  @Input() project: ProjectModel;
  @Input() collapsedActivities = [];

  @Output() activityChange = new EventEmitter<ActivityOperation>();
  @Output() activitySelect = new EventEmitter<Activity>();

  private collapsableTreeHandler: CollapsableTree;

  get allCollapsed() {
    return this.collapsableTreeHandler.allCollapsed;
  }

  get hasSelectedActivities() {
    return (this.selectedActivity.uid !== '');
  }

  activityDisplayMode(activity: Activity): CollapsableTreeNodeDisplayMode {
    return 'collapsed';
  }

  toggleCollapse(activity: Activity) {
    return this.collapsableTreeHandler.toggleCollapse(activity);
  }

  toggleCollapseAll() {
    this.collapsableTreeHandler.toggleCollapseAll();
  }

  activityNameClass(activity: Activity) {
    if (activity.level === 1) {
      return 'activity-name-level-1';
    } else if (activity.level % 2 === 0) {
      return 'activity-name-even-level';
    } else {
      return 'activity-name-odd-level';
    }
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

    this.activityChange.emit({ operation: 'insertActivity',
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
      this.activitySelect.emit(activity);
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

  // private methods

  private changeActivityParent(activity: Activity, newParent: Activity) {
    this.activityChange.emit({ operation: 'changeParent',
                       activity: activity,
                       newParent: newParent
                     });
  }

  private moveActivity(activity: Activity, newPosition: number) {
    this.activityChange.emit({ operation: 'moveActivity',
                       activity: activity,
                       newPosition: newPosition
                     });
  }

}
