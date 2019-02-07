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

import { InboxFilterComponent } from './main-page/inbox-filter.component';
import { InboxMainPageComponent } from './main-page/inbox-main-page.component';
import { WorkListComponent } from './work-list/work-list.component';

import { InboxRoutingModule } from './inbox-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    InboxRoutingModule
  ],

  declarations: [
    InboxFilterComponent,
    InboxMainPageComponent,
    WorkListComponent
  ],

  exports: [
    InboxMainPageComponent
  ]

})
export class InboxModule { }
