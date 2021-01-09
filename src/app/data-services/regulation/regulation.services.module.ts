/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { CataloguesService } from './catalogues.service';
import { ContractsService } from './contracts.service';
import { EntityService } from './entity.service';
import { DocumentService } from './document.service';
import { ProcedureService } from './procedure.service';
import { ProcessService } from './process.service';


@NgModule({

  providers: [
    CataloguesService,
    ContractsService,
    DocumentService,
    EntityService,
    ProcedureService,
    ProcessService
  ],

})
export class RegulationServicesModule { }
