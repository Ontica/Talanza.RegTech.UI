/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserInterfaceStore } from '@app/views/main-layout/ui.store';

import { MenuItem, NavigationHeader } from '@app/views/main-layout';


@Component({
  selector: 'emp-ng-navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {

  @Output() action = new EventEmitter<string>();

  navigationHeader: NavigationHeader;

  private subscription: Subscription;

  constructor(protected uiStore: UserInterfaceStore) { }


  ngOnInit() {
    this.subscription = this.uiStore.navigationHeader.subscribe (
      value => this.navigationHeader = value
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onClickMenu(menuItem: MenuItem) {
    this.action.emit(menuItem.action);
  }


}
