/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';


@Component({
  selector: 'emp-ng-object',
  template: '<object class="object" [data]="data | safeUrl"></object>',
  styles: [
    `
    .object {
        height: 100%;
        width: 100%;
     }
     `
  ]
})
export class ObjectComponent {

  @Input() data = '';

}
