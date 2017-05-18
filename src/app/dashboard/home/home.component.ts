/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';
import { SpinnerService, SpinnerState, LoggerService } from '../../core';
import { Subscription } from 'rxjs/Subscription';

import { StringLibrary, Log, HttpApiClient } from 'empiria';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public contained: Boolean = StringLibrary.includes('Hello world', 'Hello');
  public data: string;

  private spinnerState: SpinnerState;

  public constructor(private logger: LoggerService, private spinner: SpinnerService) {
    this.loadHttpData();
  }

  public ngOnInit() {
    this.spinner.spinnerState.subscribe((val) => this.spinnerState = val);
  }

  public onLogMessage() {
    this.logger.log('Logger service called on ' + Date());
  }

  public onToggleSpinner() {
    if (this.spinnerState && this.spinnerState.show) {
      this.spinner.hide();
      this.logger.log('Hide toggle spinner called on ' + Date());
    } else {
      this.spinner.show();
      this.logger.log('Show toggle spinner called on ' + Date());
    }
  }

  private loadHttpData() {
    this.getData().then((x) => this.data = x);
  }

  private async getData(): Promise<string> {
    let httpApiClient = new HttpApiClient('https://covar.azurewebsites.net/api/');

    return await httpApiClient.getAsyncAsPromise<string>('v1/system/license');
  }

}
