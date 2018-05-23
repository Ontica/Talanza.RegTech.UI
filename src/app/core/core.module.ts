/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';

import { CoreService } from './core.service';
import { ExceptionHandler } from './general/exception-handler';

import { SessionService } from './general/session.service';

import { ApplicationSettingsService } from './general/application-settings.service';
import { DirectoryService } from './http/directory.service';


import { HtmlPipe } from './pipes/html.pipe';

import { HttpHandler } from './http/http-handler';
import { HttpService } from './http/http.service';
import { HttpErrorInterceptor } from './http/http-error-interceptor';

import { LoggerService } from './general/logger.service';

import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

import { MessageBoxComponent } from './messagebox/messageBox.component';
import { MessageBoxService} from './messagebox/messageBox.service';

import { SecurityDataService } from './security/security-data.service';
import { AuthenticationService } from './security/authentication.service';
import { SecurityGuardService } from './security/security-guard.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({

  imports: [
    CommonModule, HttpClientModule
  ],

  declarations: [HtmlPipe, MessageBoxComponent, SpinnerComponent],

  exports: [HtmlPipe, MessageBoxComponent, SpinnerComponent],

  providers: [CoreService, ExceptionHandler, SessionService,
              ApplicationSettingsService, LoggerService,
              SecurityDataService, AuthenticationService,
              SecurityGuardService, HttpHandler, HttpService, DirectoryService,
              SpinnerService, MessageBoxService,
              { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
            ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    console.log("CoreModule cntrcor");

    throwIfAlreadyLoaded(parentModule, 'CoreModule');

  }

}
