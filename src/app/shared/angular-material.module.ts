/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { MatButtonModule, MatDatepickerModule,
         MatDialogModule, MatFormFieldModule,
         MatNativeDateModule, MatTabsModule } from '@angular/material';

@NgModule({

  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTabsModule
  ],

  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTabsModule
  ],
})
export class AngularMaterialModule { }
