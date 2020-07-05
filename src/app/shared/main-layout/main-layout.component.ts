/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { UserInterfaceStore } from '@app/store/ui.store';


@Component({
  selector: 'emp-ng-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  keywords = '';

  useForeignLanguage = false;
  currentLanguage = 'Spanish';

  constructor(private uiStore: UserInterfaceStore,
              private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof ActivationEnd) {
        const url = this.router.routerState.snapshot.url.split(';')[0];

        uiStore.setCurrentViewFromUrl(url);
      }
    });
  }


  ngOnInit(): void {
    this.uiStore.useForeignLanguage.subscribe(
      x => {
        this.useForeignLanguage = x;
        if (this.useForeignLanguage) {
          this.currentLanguage = 'English';
        } else {
          this.currentLanguage = 'Spanish';
        }
      }
    )
  }



  onAction(event: any) {

  }


  search(keywords: string) {
    if (keywords) {
      this.router.navigate(['/search/main', { keywords: keywords } ]);
    }
  }

  toggleLanguage() {
    this.uiStore.toggleForeignLanguage();
  }
}
