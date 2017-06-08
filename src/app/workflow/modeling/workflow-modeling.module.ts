/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessDefinitionComponent } from './process-definition.component';

import { DiagramIdentificationComponent } from  './diagram-identification.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule],
  declarations: [ProcessDefinitionComponent, DiagramIdentificationComponent],
  exports: [ProcessDefinitionComponent]
})
export class WorkflowModelingModule { }
