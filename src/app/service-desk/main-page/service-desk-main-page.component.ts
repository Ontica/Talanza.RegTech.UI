/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'emp-kb-service-desk',
  templateUrl: './service-desk-main-page.component.html',
  styleUrls: ['./service-desk-main-page.component.scss']
})
export class ServiceDeskMainPageComponent {

  selectedTask = 'ticket';
  keywords = '';
  isDisplayFaq = false;

  FAQUid = '';
  selectedTicketUID = '';
  meetingUpdated: any;
  onAddMeeting = false;


  setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;
    this.FAQUid = '';
    this.isDisplayFaq = false;
  }


  search(keywords: string): void {
    this.keywords = keywords;
  }


  setSelectedFAQ(uid: string): void {
    this.FAQUid = uid;
    this.isDisplayFaq = true;
  }


  notifyMeetingWasUpdate(meeting: any): void {
    this.meetingUpdated = meeting;
  }


  addMeeting(): void {
    this.selectedTicketUID = '';
    this.onAddMeeting = true;
  }


  selectedMeeting(meetingUID: string): void {
    this.selectedTicketUID = meetingUID;
    this.onAddMeeting = false;
  }

}
