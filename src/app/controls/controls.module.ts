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
import { ModalWindow } from './modal-window/modal-window';
import { PdfViewer } from './pdf-viewer/pdf-viewer';
import { DropdownMenuControl } from './dropdown-menu-control/dropdown-menu.control';

import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule],
  declarations: [AutocompleteControl, Chips, RAGControl, CalendarControl, SelectControl,
                 SafeHtmlPipe, SearchControl, NavBarControl, ModalWindow, SafeUrlPipe,
                 PdfViewer, DropdownMenuControl],
  exports: [AutocompleteControl, Chips, SafeHtmlPipe, SafeUrlPipe, PdfViewer,
            RAGControl, CalendarControl, SelectControl, SearchControl, NavBarControl,
            ModalWindow, DropdownMenuControl] 
})
export class ControlsModule { }
