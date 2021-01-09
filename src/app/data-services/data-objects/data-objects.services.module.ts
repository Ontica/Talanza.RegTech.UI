/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { DataObjectsService } from './data-objects.service';
import { DataFormService } from './data-form.service';


@NgModule({

  providers: [
    DataObjectsService,
    DataFormService
  ],

})
export class DataObjectsServicesModule { }
