/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { ProjectMeetingComponent } from './main-page/project-meeting.component';
import { MeetingRootComponent } from './parts/meeting-root.component';
import { ParticipantsComponent } from './parts/participants.component';
import { SubjectComponent } from './parts/subjects.component';
import { RecomendationsComponent } from './parts/recomendations.component';
import { AgreementsComponent } from './parts/agreements.component';
import { AddMeetingModalWindowComponent } from './views/add-meeting-modal.window.component';
import { MeetingComponent } from './views/meeting.component';
import { MeetingsComponent } from './views/project-meetings.component';

import { ProjectMeetingsRoutingModule } from './project-meetings-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProjectMeetingsRoutingModule

  ],

  declarations: [
    AddMeetingModalWindowComponent,
    AgreementsComponent,
    MeetingComponent,
    MeetingRootComponent,
    MeetingsComponent,
    ParticipantsComponent,
    ProjectMeetingComponent,
    RecomendationsComponent,
    SubjectComponent
  ],

  exports: [
    AddMeetingModalWindowComponent,
    MeetingComponent,
    MeetingsComponent,
    ProjectMeetingComponent
  ]
})
export class ProjectMeetingsModule { }
