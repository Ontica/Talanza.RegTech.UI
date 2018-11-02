/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '@app/core';

import { MainLayoutComponent } from '@app/shared';

import { InboxMainPageComponent } from './main-page/inbox-main-page.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'inbox', component: MainLayoutComponent,
        data: { layoutType: 'Inbox' }, canActivate: [SecurityGuardService],
        children: [{ path: 'main', component: InboxMainPageComponent }]
      }
    ])],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
