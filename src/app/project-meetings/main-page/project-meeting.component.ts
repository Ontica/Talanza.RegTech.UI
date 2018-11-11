/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Meeting } from '@app/models/project-management';


@Component({
  selector: 'emp-kb-project-meeting',
  templateUrl: './project-meeting.component.html',
  styleUrls: ['./project-meeting.component.scss']
})
export class ProjectMeetingComponent {

  selectedTask = 'meetingData';
  title = 'Agregar Reunión';

  private _meetingUID = '';

  @Input()
  set meetingUID(meetingUID: string) {
    this._meetingUID = meetingUID;
  }
  get meetingUID(): string {
    return this._meetingUID;
  }


  @Output() update = new EventEmitter<Meeting>();


  setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
  }


  updateMeetingData(projectMeeting: Meeting): void {
    this.title = projectMeeting.title;

    this.update.emit(projectMeeting);
  }

}
