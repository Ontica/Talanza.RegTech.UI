/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';


@Component({
  selector: 'emp-ng-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  keywords = '';
  layoutType: string;

  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof ActivationEnd) {
        if (val.snapshot.data['layoutType']) {
          this.layoutType = val.snapshot.data['layoutType'];
          console.log('route change', val, this.layoutType);
        }
      }
    });
  }


  onAction(event: any) {

  }


  search(keywords: string) {
    if (keywords) {
      this.router.navigate(['/search/main', { keywords: keywords } ]);
    }
  }

}
