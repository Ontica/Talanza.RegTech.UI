/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserInterfaceStore } from '@app/store/ui.store';

import { LayoutType } from '@app/models/user-interface';


@Component({
  selector: 'emp-ng-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  keywords = '';
  layoutType: string;

  private subscription: Subscription;

  constructor(private uiStore: UserInterfaceStore,
              private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof ActivationEnd) {
        if (val.snapshot.data['layoutType']) {
          uiStore.setLayoutType(val.snapshot.data['layoutType'] as LayoutType);
        }
        if (val.snapshot.data['viewName']) {
          uiStore.setCurrentView(val.snapshot.data['viewName']);
        }
      }
    });
  }


  ngOnInit(): void {
    this.subscription = this.uiStore.layoutType.subscribe(
      value => this.layoutType = value
    );
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onAction(event: any) {

  }


  search(keywords: string) {
    if (keywords) {
      this.router.navigate(['/search/main', { keywords: keywords } ]);
    }
  }

}
