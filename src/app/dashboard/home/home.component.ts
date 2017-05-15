/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

import { StringLibrary, Log, HttpApiClient } from 'empiria';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public contained: Boolean = StringLibrary.includes('Hello world', 'Hello');
  public data: string;

  public constructor() {
    this.load();
  }

  private load() {
    this.getData().then((x) => this.data = x);
  }

  private async getData(): Promise<string> {
    let httpApiClient = new HttpApiClient('https://covar.azurewebsites.net/api/');

    return await httpApiClient.getAsyncAsPromise<string>('v1/system/license');
  }

}
