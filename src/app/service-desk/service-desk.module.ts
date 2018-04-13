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

import { ServiceDeskRoutingModule } from './service-desk-routing.module';

import { ServiceDeskMainPageComponent } from './main-page/service-desk-main-page.component';
import { TicketsComponent } from './tickets/tickets.component';
import { FAQsComponent } from './faqs/faqs.component';
import { FAQComponent } from './faqs/faq.component';
import { AddFAQComponent } from './faqs/add-faq.component';
import { AddFAQModalWindowComponent } from './faqs/add-faq-modal.window.component';
import { UpdateFAQComponent } from './faqs/update-faq.component';

import { MeetingReportComponent } from './tickets/meeting-report/meeting-report.component';
import { MeetingDataComponent } from './tickets/meeting-report/meeting-data.component';
import { AssistiansComponent } from './tickets/meeting-report/assistians.component';
import { SubjectComponent } from './tickets/meeting-report/subjects.component';
import { RecomendationsComponent } from './tickets/meeting-report/recomendations.component';
import { AddTicketModalWindowComponent } from './tickets/meeting-report/add-ticket-modal.window.component';

import { FAQsTableViewComponent } from './faqs/views/faqs-table-view.component';

/** 
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ServiceDeskRoutingModule, CommonModule, FormsModule, ControlsModule],
  declarations: [ServiceDeskMainPageComponent, TicketsComponent, FAQsComponent,
                 FAQComponent, AddFAQComponent, AddFAQModalWindowComponent, UpdateFAQComponent,
                 FAQsTableViewComponent, MeetingReportComponent, MeetingDataComponent, AssistiansComponent,
                 SubjectComponent, RecomendationsComponent, AddTicketModalWindowComponent],
  exports: [ServiceDeskMainPageComponent, AddFAQComponent, FAQsTableViewComponent,
             FAQComponent, AddFAQModalWindowComponent, AddTicketModalWindowComponent]
})
export class ServiceDeskModule { }
