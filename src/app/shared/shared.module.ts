/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { NavbarComponent } from './navbar/navbar.component';
import { NoContentComponent } from './no-content/no-content.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { AutocompleteControl } from './controls/autocomplete-control';
import { Chips } from './controls/chips';
import { RAGControl } from './controls/rag.control';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule],
  declarations: [MainLayoutComponent, NavbarComponent, NoContentComponent, SafeHtmlPipe,
                 AutocompleteControl, Chips, RAGControl],
  exports: [MainLayoutComponent, NoContentComponent, SafeHtmlPipe, AutocompleteControl, Chips,
            RAGControl]
})
export class SharedModule { }
