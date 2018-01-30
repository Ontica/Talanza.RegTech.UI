/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})

export class LoadDynamicDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
