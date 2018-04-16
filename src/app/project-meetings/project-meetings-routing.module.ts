/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { SecurityGuardService } from '../core';

import { MainLayoutComponent } from '../shared';

import { MeetingReportComponent } from './main-page/meeting-report.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'project-meetings', component:MainLayoutComponent , canActivate: [SecurityGuardService],
                children: [{path: 'search', component: MeetingReportComponent }]
            }
        ])],
   exports: [RouterModule]     
})

export class ProjectMeetingsRoutingModule {}