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
import { AddFAQMenuComponent } from './faqs/add-faq-menu.component';
import { UpdateFAQComponent } from './faqs/update-faq.component';

import { FAQsTableViewComponent } from './faqs/views/faqs-table-view.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ServiceDeskRoutingModule, CommonModule, FormsModule, ControlsModule],
  declarations: [ServiceDeskMainPageComponent, TicketsComponent, FAQsComponent,
                 FAQComponent, AddFAQComponent, AddFAQMenuComponent, UpdateFAQComponent,
                 FAQsTableViewComponent],
  exports: [ServiceDeskMainPageComponent, AddFAQComponent, FAQsTableViewComponent,
             FAQComponent, AddFAQMenuComponent]
})
export class ServiceDeskModule { }
