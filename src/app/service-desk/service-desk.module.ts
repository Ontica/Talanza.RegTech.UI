/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectMeetingsModule } from '@app/project-meetings/project-meetings.module';
import { SharedModule } from '@app/shared/shared.module';

import { AddFAQModalWindowComponent } from './faqs/add-faq-modal.window.component';
import { AddFAQComponent } from './faqs/add-faq.component';
import { FAQComponent } from './faqs/faq.component';
import { FAQsComponent } from './faqs/faqs.component';
import { UpdateFAQComponent } from './faqs/update-faq.component';
import { FAQsTableViewComponent } from './faqs/views/faqs-table-view.component';
import { ServiceDeskMainPageComponent } from './main-page/service-desk-main-page.component';
import { TicketsComponent } from './tickets/tickets.component';

import { ServiceDeskRoutingModule } from './service-desk-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ProjectMeetingsModule,

    ServiceDeskRoutingModule,
  ],

  declarations: [
    AddFAQComponent,
    AddFAQModalWindowComponent,
    FAQComponent,
    FAQsComponent,
    FAQsTableViewComponent,
    ServiceDeskMainPageComponent,
    TicketsComponent,
    UpdateFAQComponent
  ],

  exports: [
    AddFAQComponent,
    AddFAQModalWindowComponent,
    FAQComponent,
    FAQsTableViewComponent,
    ServiceDeskMainPageComponent
  ]

})
export class ServiceDeskModule { }
