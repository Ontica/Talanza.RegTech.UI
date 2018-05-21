/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';

import { CoreModule } from './core/core.module';

import { ContractsModule } from './contracts/contracts.module';
import { ControlsModule } from './controls/controls.module';
import { DocumentsModule } from './documents/documents.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProcessModule } from './process/process.module';
import { GlobalSearchModule } from './global-search/global-search.module';
import { InboxModule } from './inbox/inbox.module';
import { ObligationsModule } from './obligations/obligations.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { ProjectMeetingsModule } from './project-meetings/project-meetings.module';
import { SecurityUIModule } from './security-ui/security-ui.module';
import { ServiceDeskModule } from './service-desk/service-desk.module';
import { SharedModule } from './shared/shared.module';

// App is our top level component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';


// Define global exception handler provider
import { ErrorHandler } from '@angular/core';
import { ExceptionHandler } from './core/general/exception-handler';

const EXCEPTION_HANDLER_PROVIDER =  { provide: ErrorHandler, useClass: ExceptionHandler };


// Temporarily main SCSS file injection
import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  EXCEPTION_HANDLER_PROVIDER
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  /**
   * Import Angular's modules.
   */
  imports: [
    AppRoutingModule,
    BrowserModule,
    ContractsModule,
    ControlsModule,
    CoreModule,
    DashboardModule,
    DocumentsModule,
    FormsModule,
    GlobalSearchModule,
    InboxModule,
    ObligationsModule,
    ProcessModule,
    ProjectManagementModule,
    ReactiveFormsModule,
    SecurityUIModule,
    ServiceDeskModule,
    SharedModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}
