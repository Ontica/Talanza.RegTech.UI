/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CommonModule } from '@angular/common';

import { CoreService } from './core.service';
import { ApplicationSettingsService } from './services/application-settings.service';
import { LoggerService } from './services/logger.service';

import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    CommonModule, HttpModule
  ],
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
  providers: [CoreService, ApplicationSettingsService, LoggerService, SpinnerService]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
