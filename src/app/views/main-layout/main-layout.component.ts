/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PresentationState } from '@app/core/presentation';

import { MainUIStateAction, MainUIStateSelector } from '@app/core/presentation/presentation-types';

@Component({
  selector: 'emp-ng-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  keywords = '';
  spinnerService = null;

  useForeignLanguage = false;
  currentLanguage = 'Spanish';

  displayEditor = false;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private state: PresentationState, private router: Router) {

    this.spinnerService = state.select<boolean>(MainUIStateSelector.IS_PROCESSING);

    this.router.events
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(val => {
        if (val instanceof ActivationEnd) {
          const url = this.router.routerState.snapshot.url.split(';')[0];

          state.dispatch(MainUIStateAction.SET_CURRENT_VIEW_FROM_URL, { url });
        }
      });
  }


  ngOnInit(): void {
    this.state.select<boolean>(MainUIStateSelector.USE_FOREIGN_LANGUAGE)
    .subscribe(
      x => {
        this.useForeignLanguage = x;
        if (this.useForeignLanguage) {
          this.currentLanguage = 'English';
        } else {
          this.currentLanguage = 'Spanish';
        }
      }
    );
  }

  onAction(event: any) {

  }


  onShowSettings() {
    this.displayEditor = true;
  }


  hideEditor() {
    this.displayEditor = false;
  }


  search(keywords: string) {
    if (keywords) {
      this.router.navigate(['/search/main', { keywords: keywords } ]);
    }
  }

  toggleLanguage() {
    this.state.dispatch(MainUIStateAction.TOGGLE_FOREIGN_LANGUAGE);
  }

}
