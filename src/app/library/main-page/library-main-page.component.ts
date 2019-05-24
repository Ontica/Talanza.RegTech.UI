/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserInterfaceStore } from '@app/store/ui.store';
import { View } from '@app/models/user-interface';


@Component({
  selector: 'emp-kb-library-main-page',
  templateUrl: './library-main-page.component.html',
  styleUrls: ['./library-main-page.component.scss']
})
export class LibraryMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;

  private subs1: Subscription;


  constructor(private uiStore: UserInterfaceStore)  { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.currentView = x
    );
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
  }

}
