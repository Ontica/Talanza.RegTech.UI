/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { StepsDesignService } from './steps-design.service';
import { StepsDataObjectsService } from './steps-data-objects.service';


@NgModule({

  providers: [
    StepsDesignService,
    StepsDataObjectsService
  ],

})
export class StepsServicesModule { }
