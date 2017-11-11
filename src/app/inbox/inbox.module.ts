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
import { SharedModule } from '../shared/shared.module';

import { InboxRoutingModule } from './inbox-routing.module';

import { WorkListComponent } from './work-list/work-list.component';

import { InboxFilterComponent } from './main-page/inbox-filter.component';
import { InboxMainPageComponent } from './main-page/inbox-main-page.component';

import { InboxEditorComponent } from './editor/inbox-editor.component';
import { TaskEditorComponent } from './editor/tabs/task-editor/task-editor.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [InboxRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [InboxMainPageComponent, InboxFilterComponent, WorkListComponent,
                 TaskEditorComponent, InboxEditorComponent ],
  exports: [InboxMainPageComponent]
})
export class InboxModule { }
