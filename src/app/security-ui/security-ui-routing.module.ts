/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: UserLoginComponent }
  ])],
  exports: [RouterModule]
})
export class SecurityUIRoutingModule { }
