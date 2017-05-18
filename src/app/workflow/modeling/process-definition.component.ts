/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as modeler from 'bpmn-js/lib/Modeler';

@Component({
  selector: 'process-definition',
  templateUrl: './process-definition.component.html'
})
export class ProcessDefinitionComponent {

  public url: SafeResourceUrl;

  public constructor(private sanitizer: DomSanitizer) {
    this.load();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./process-modeler.html');
  }

  private load() {
    console.log('loading process definition component ...');
  }

}
