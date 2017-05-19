/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';
import { CoreService, SpinnerState } from '../../core';
import { Subscription } from 'rxjs/Subscription';

import { StringLibrary, Log } from 'empiria';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public contained: Boolean = StringLibrary.includes('Hello world', 'Hello');
  public data: string;

  private spinnerState: SpinnerState;

  public constructor(private core: CoreService) { }

  public ngOnInit() {
    this.core.spinner.spinnerState.subscribe((val) => this.spinnerState = val);
    this.core.appSettings.onLoad().then(() => this.loadData());
  }

  public onLogMessage() {
    this.core.logger.log('Logger service called on ' + Date());
  }

  public onToggleSpinner() {
    if (this.spinnerState && this.spinnerState.show) {
      this.core.spinner.hide();
      this.core.logger.log('Hide toggle spinner called on ' + Date());
    } else {
      this.core.spinner.show();
      this.core.logger.log('Show toggle spinner called on ' + Date());
    }
  }

  private loadData() {
    this.getDataFromHttpServer().then((x) => this.data = x);
  }

  private async getDataFromHttpServer(): Promise<string> {
    let httpApiClient = this.core.getHttpClient(this.core.appSettings.get<string>('HTTP_API_BASE_ADDRESS'));

    return await httpApiClient.getAsyncAsPromise<string>('v1/system/license');
  }

}
