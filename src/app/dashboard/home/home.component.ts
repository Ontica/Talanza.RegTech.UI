/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { StringLibrary, Log } from 'empiria';
import { CoreService, SpinnerState } from '../../core';

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
    this.invokeProtectedHttpService();
    this.invokeHttpService();
    this.invokeProtectedHttpServiceWithParameters();
  }

  public invokeHttpService() {
    this.core.http.get('System.GetLicense')
                  .subscribe((service) => this.core.logger.log('directory service is ' +
                                                               JSON.stringify(service)));
  }

  public invokeProtectedHttpService() {
    this.core.http.get<any[]>('v1/procedures')
                  .subscribe((service) => this.core.logger.log('protected service returned ' +
                                                               service.length));
  }

  public invokeProtectedHttpServiceWithParameters() {
    // var serviceParams = this.core.http.buildPars('uid', 'PhLEtHoEmoew2OEvlustiAs4leqi4prL');
    const serviceParams = ['uid', 'PhLEtHoEmoew2OEvlustiAs4leqi4prL'];

    this.core.http.get('Steps.Modeling.GetProcedure', { serviceParams })
                  .subscribe((service) => this.core.logger.log('protected service WITH PARS returned ' +
                                                               service));
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

}
