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

import { AutocompleteControl } from  './autocomplete/autocomplete-control';

import { Chips } from './chips/chips';
import { RAGControl } from './rag/rag.control';
import { CalendarControl } from './calendar/calendar-control';
import { SelectControl } from './select-control/select-control';
import { SearchControl } from './search/search.control';
import { NavBarControl } from './nav-bar/nav-bar.control';
 
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule],
  declarations: [AutocompleteControl, Chips, RAGControl, CalendarControl, SelectControl,
                 SafeHtmlPipe, SearchControl, NavBarControl],
  exports: [AutocompleteControl, Chips, SafeHtmlPipe,
            RAGControl, CalendarControl, SelectControl, SearchControl, NavBarControl] 
})
export class ControlsModule { }
