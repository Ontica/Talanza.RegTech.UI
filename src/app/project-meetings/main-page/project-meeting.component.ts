/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Meeting } from '@app/models/project-management';


@Component({
  selector: 'project-meeting',
  templateUrl: './project-meeting.component.html',
  styleUrls: ['./project-meeting.component.scss']
})
export class ProjectMeetingComponent {

  public selectedTask = "meetingData";
  public title = 'Agregar Reunión';

  private _meetingUID: string = "";

  @Input()
  set meetingUID(meetingUID: string) {
    this._meetingUID = meetingUID;
  }
  get meetingUID(): string {
    return this._meetingUID;
  }


  @Output() onUpdateMeeting = new EventEmitter<Meeting>();


  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
  }


  public updateMeetingData(projectMeeting: Meeting): void {
    this.title = projectMeeting.title;

    this.onUpdateMeeting.emit(projectMeeting);
  }

}
