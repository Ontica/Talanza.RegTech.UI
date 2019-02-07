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

import { AddFAQModalWindowComponent } from './faqs/add-faq-modal.window.component';
import { AddFAQComponent } from './faqs/add-faq.component';
import { FAQComponent } from './faqs/faq.component';
import { FAQsComponent } from './faqs/faqs.component';
import { UpdateFAQComponent } from './faqs/update-faq.component';
import { FAQsTableViewComponent } from './faqs/views/faqs-table-view.component';


import { ServiceDeskRoutingModule } from './service-desk-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ServiceDeskRoutingModule,
  ],

  declarations: [
    AddFAQComponent,
    AddFAQModalWindowComponent,
    FAQComponent,
    FAQsComponent,
    FAQsTableViewComponent,
    UpdateFAQComponent
  ],

  exports: [
    AddFAQComponent,
    AddFAQModalWindowComponent,
    FAQComponent,
    FAQsTableViewComponent
  ]

})
export class ServiceDeskModule { }
