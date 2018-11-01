/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { CataloguesService } from './catalogues.service';


@NgModule({

  providers: [
    CataloguesService
  ]

})
export class UtilityServicesModule { }
