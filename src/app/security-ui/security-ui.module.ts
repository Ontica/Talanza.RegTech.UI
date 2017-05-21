/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginComponent } from './user-login/user-login.component';
import { SecurityUIRoutingModule } from './security-ui-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [SecurityUIRoutingModule, CommonModule],
  declarations: [UserLoginComponent],
  exports: [UserLoginComponent]
})
export class SecurityUIModule { }
