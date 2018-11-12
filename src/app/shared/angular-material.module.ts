/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';


@NgModule({

  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],

  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
})
export class AngularMaterialModule { }
