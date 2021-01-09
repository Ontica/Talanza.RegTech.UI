/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PresentationLayer } from '@app/core/presentation';

import { View } from '@app/views/main-layout';

import { MainUIStateSelector } from '@app/core/presentation/presentation-types';


@Component({
  selector: 'emp-kb-library-main-page',
  templateUrl: './library-main-page.component.html',
  styleUrls: ['./library-main-page.component.scss']
})
export class LibraryMainPageComponent implements OnInit, OnDestroy {

  currentView: View;
  displayEditor = false;

  private subs1: Subscription;

  constructor(private uiLayer: PresentationLayer)  { }

  ngOnInit() {
    this.subs1 = this.uiLayer.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .subscribe(x => this.currentView = x);
  }

  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
  }

}
