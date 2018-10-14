/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({

  imports: [
    MatButtonModule,
    MatDialogModule
  ],

  exports: [
    MatButtonModule,
    MatDialogModule
  ],
})
export class AngularMaterialModule { }
