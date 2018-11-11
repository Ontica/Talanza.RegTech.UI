/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Validate } from '@app/core';

import { ProjectService, ProjectMeetingService } from '@app/services/project-management';

import { Meeting, EmptyMeeting, Project } from '@app/models/project-management';


@Component({
  selector: 'emp-kb-meeting-root',
  templateUrl: './meeting-root.component.html',
  styleUrls: ['./meeting-root.component.scss']
})
export class MeetingRootComponent implements OnInit {

  meeting = EmptyMeeting();
  isMeetingData = false;

  projects: Project[] = [];

  private _meetingUID = '';
  @Input()
  set meetingUID(meetingUID: string) {
    this._meetingUID = meetingUID;

    if (Validate.hasValue(meetingUID)) {
      this.loadMeeting();
    }
  }
  get meetingUID(): string {
    return this._meetingUID;
  }

  @Output() update = new EventEmitter<Meeting>();


  constructor(private projectMeetingService: ProjectMeetingService,
              private projectService: ProjectService) { }


  ngOnInit() {
    this.loadProjectsList();
  }


  async doOperation() {

    if (!this.validate()) {
      return;
    }

    if (this.meetingUID === '') {
      await this.saveMeetingData();
    } else {
      this.updateMeeting();
    }

    this.isMeetingData = true;

  }


  cancel() {
    this.loadMeeting();
    this.update.emit(this.meeting);
  }


  onChangeProject(projectUId: string): void {
    if (projectUId === '') {
      return;
    }

    const index = this.projects.findIndex((x) => x.uid === projectUId);
    this.meeting.project = this.projects[index];
  }


  private validateTime(time: string): boolean {
    const regexp = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$');
    if (regexp.test(time)) {
      return true;
    }
    return false;
  }


  private validateMeetingDate(): boolean {
    const today = new Date();
    const meetingDate = new Date(this.meeting.date);

    if (meetingDate > today) {
      alert('La fecha de termino no puede ser posterior al día de hoy');
      return false;
    }

    return true;
  }


  private validateIfEndTimeIsLessThanStartTime(): boolean {
    const startTime = new Date('01 01 2021 ' + this.meeting.startTime);
    const endTime = new Date('01 01 2021 ' + this.meeting.endTime);

    if (endTime.getTime() < startTime.getTime()) {
      alert('La hora de término no pude ser anteriro que la hora de inicio');
      return false;
    }

    return true;
  }


  private validate(): boolean {
    if (this.meeting.title === '') {
      alert('El nombre de la reunión se encuentra en blanco');
      return false;
    }
    if (!this.validateTime(this.meeting.startTime)) {
      alert('La hora de inicio no tiene un formato valido hh:mm.');
      return false;
    }
    if (!this.validateTime(this.meeting.endTime)) {
      alert('La hora de término no tiene un formato valido hh:mm.');
      return false;
    }
    if (!this.validateMeetingDate()) {
      return false;
    }
    if (!this.validateIfEndTimeIsLessThanStartTime()) {
      return false;
    }

    return true;
  }


  private async saveMeetingData() {
    await this.projectMeetingService.addMeeting(this.meeting)
      .subscribe((x) => {
        this.update.emit(x);
        this.isMeetingData = true;
        this.meetingUID = x.uid;
      });
  }


  private async loadMeeting() {
    this.projectMeetingService.getMeeting(this.meetingUID)
      .subscribe((x) => {
        this.meeting = x;
      });
  }


  private updateMeeting() {
    this.projectMeetingService.updateMeeting(this.meeting)
      .subscribe((x) => {
        this.update.emit(x);
      });
  }


  private loadProjectsList() {
    const error = 'Ocurrió un problema al leer la lista de proyectos.';

    this.projectService.getProjectList()
      .subscribe((x) => { this.projects = x; },
        () => { alert(error); });
  }

}
