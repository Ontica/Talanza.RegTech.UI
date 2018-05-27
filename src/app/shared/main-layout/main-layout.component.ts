/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  userName = 'UserName || et al';
  title = 'Administración del cumplimiento regulatorio';
  breadcrumb = '';

  isGlobalSearchPageVisible = false;
  keywords: string = '';


  closeGlobalSearchPage() {
    this.isGlobalSearchPageVisible = false;
  }


  search(keywords: string) {
    if (keywords) {
      this.keywords = keywords;

      this.isGlobalSearchPageVisible = true;
    }
  }

}
