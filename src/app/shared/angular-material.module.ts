/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import {
  MomentDateAdapter,
  MatMomentDateModule
} from '@angular/material-moment-adapter';


import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';


import * as moment from 'moment';


const APP_DEFAULT_DATE_LOCAL = 'es-MX';

moment.updateLocale(APP_DEFAULT_DATE_LOCAL, {
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MMM/YYYY',
    LL: 'DD [de] MMMM [de] YYYY',
    LLL: 'DD [de] MMMM [de] YYYY LT',
    LLLL: 'dddd DD [de] MMMM [de] YYYY LT'
  },
  week: {
    dow: 7,
    doy: 1
  }
});

moment.locale(APP_DEFAULT_DATE_LOCAL);


export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMM-YYYY',
    dateA11yLabel: 'DD/MMM/YYYY',
    monthYearA11yLabel: 'MMM-YYYY',
  },
};

@NgModule({

  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatTabsModule
  ],

  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatTabsModule
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: APP_DEFAULT_DATE_LOCAL },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]

})
export class AngularMaterialModule { }
