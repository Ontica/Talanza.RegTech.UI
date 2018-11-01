/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { EntityService } from './entity.service';
import { ProcedureService } from './procedure.service';


@NgModule({

  providers: [
    EntityService,
    ProcedureService
  ],

})
export class ProcedureServicesModule { }
