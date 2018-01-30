/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Type } from '@angular/core';

export class DynamicComponent {
  constructor(
    public component: Type<any>, 
    public name: string,
    public data: any) {}
}

