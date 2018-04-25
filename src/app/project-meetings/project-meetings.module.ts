/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../controls/controls.module';

import { ProjectMeetingsRoutingModule } from './project-meetings-routing.module';

import { ProjectMeetingComponent } from './main-page/project-meeting.component';

import { MeetingRootComponent } from './parts/meeting-root.component';
import { ParticipantsComponent } from './parts/participants.component';
import { SubjectComponent } from './parts/subjects.component';
import { RecomendationsComponent } from './parts/recomendations.component';
import { AgreementsComponent } from './parts/agreements.component';
import { AddTicketModalWindowComponent } from './views/add-ticket-modal.window.component';

import { MeetingsComponent } from './views/project-meetings.component';
import { MeetingComponent } from  './views/meeting.component';

/** 
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProjectMeetingsRoutingModule, CommonModule, FormsModule, ControlsModule],
  declarations: [ProjectMeetingComponent, MeetingRootComponent, ParticipantsComponent,
                 SubjectComponent, RecomendationsComponent, AddTicketModalWindowComponent, 
                 AgreementsComponent, MeetingsComponent, MeetingComponent],
  exports: [ProjectMeetingComponent, AddTicketModalWindowComponent, MeetingsComponent,
            MeetingComponent]
})
export class ProjectMeetingsModule { }
