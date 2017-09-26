/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

@Component({
  selector:'documents-main-page',
  templateUrl:'./documents-main-page.component.html',
  styleUrls: ['./documents-main-page.component.scss']
})

export class DocumentsMainPageComponent {

  public openExternalWindow(url:string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }
  
}