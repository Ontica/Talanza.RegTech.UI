/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Validate } from '@app/core';

import { Meeting } from '@app/models/project-management';
import { ProjectMeetingService } from '@app/services/project-management';


@Component({
  selector: 'emp-kb-meetings',
  templateUrl: './project-meetings.component.html',
  styleUrls: ['./project-meetings.component.scss'],
  providers: [ProjectMeetingService]
})
export class MeetingsComponent implements OnInit {

  openedMeetings: Meeting[] = [];
  closedMeetings: Meeting[] = [];

  selectedMeetingUid = '';
  filter = 'all';

  keywords = '';

  isOpenAddMeetingWindow = false;

  private _updatedMeeting: Meeting;
  @Input()
  set updatedMeeting(updatedMeeting: Meeting) {
    if (Validate.hasValue(updatedMeeting)) {
      this._updatedMeeting = updatedMeeting;

      this.loadOpenedMeetings();
      this.loadClosedMeetings();
    }
  }
  get updatedMeeting(): Meeting {
    return this._updatedMeeting;
  }

  @Output() select = new EventEmitter<string>();
  @Output() create = new EventEmitter();

  constructor(private projectMeetingService: ProjectMeetingService) { }

  ngOnInit() {
    this.loadMeetings();
  }

  onFilterBy(filter: string): void {
    this.filter = filter;
  }

  onSelectMeeting(uid: string): void {
    this.selectedMeetingUid = uid;

    this.select.emit(uid);
  }

  search(keywords: string): void {
    this.keywords = keywords;
    this.loadMeetings();
  }

  addMeeting(): void {
    this.create.emit();
  }

  private async loadMeetings() {
    await this.loadOpenedMeetings();
    this.loadClosedMeetings();
  }

  private loadOpenedMeetings(): void {
    this.projectMeetingService.getOpenedMeetings(this.keywords)
      .subscribe((meetings) => { this.openedMeetings = meetings; });
  }

  private loadClosedMeetings(): void {
    this.projectMeetingService.getMeetings(this.keywords)
      .subscribe((meetings) => {
        this.closedMeetings = meetings.filter(meeting => meeting.status === 'Closed');
      });
  }

}
