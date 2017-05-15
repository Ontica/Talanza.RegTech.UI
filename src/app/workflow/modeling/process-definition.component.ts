/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

@Component({
  selector: 'process-definition',
  templateUrl: './process-definition.component.html'
})
export class ProcessDefinitionComponent {

    public constructor() {
      this.load();
    }

    private load() {
      console.log('loading process definition component ...');
    }

}
