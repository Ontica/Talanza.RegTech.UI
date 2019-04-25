/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserInterfaceStore } from '@app/store/ui.store';

import { NavigationHeader, createMenuItemForView, View } from '@app/models/user-interface';



@Component({
  selector: 'emp-ng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;
  toggleEditor = false;

  private subs1: Subscription;


  constructor(private uiStore: UserInterfaceStore) { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      x => {
        this.currentView = x;
      }
    );
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
  }

}
