/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Assertion, Exception } from '@app/core';

import { APP_VIEWS, APP_LAYOUTS, buildNavigationHeader,
         DefaultNavigationHeader, DefaultView,
         Layout, NavigationHeader, View } from '@app/models/user-interface';


@Injectable()
export class UserInterfaceStore {

  private _currentLayout: BehaviorSubject<Layout> = new BehaviorSubject<Layout>(APP_LAYOUTS['Home']);

  private _currentView: BehaviorSubject<View> = new BehaviorSubject<View>(DefaultView);

  private _navigationHeader:
                BehaviorSubject<NavigationHeader> = new BehaviorSubject(DefaultNavigationHeader);


  constructor() { }


  // select methods

  get currentView(): Observable<View> {
    return this._currentView.asObservable();
  }


  get layout(): Observable<Layout> {
    return this._currentLayout.asObservable();
  }


  get navigationHeader(): Observable<NavigationHeader> {
    return this._navigationHeader.asObservable();
  }

  // reduce methods


  setCurrentViewFromUrl(url: string) {
    if (this._currentView.value.url !== url) {
      const view = APP_VIEWS.find(x => x.url === url);

      if (!view) {
        const msg = `Unregistered view with url '${url}'.`;
        console.log(msg);
        throw new Exception(msg);
      }

      const viewLayout = this.getViewLayout(view);

      if (this._currentLayout.value !== viewLayout) {
        this.setLayout(viewLayout);
      }

      this.setNavigationHeader(view);

      this._currentView.next(view);
    }
  }


  setMainTitle(newTitle: string) {
    const newHeader = Object.assign({}, this._navigationHeader.value, { title: newTitle });

    this.setNavigationHeader(newHeader);
  }


  setNavigationHeader(value: NavigationHeader | View) {
    if (value && value['url']) {
      const layout = APP_LAYOUTS.find(x => x.name === this._currentLayout.value.name);

      const navHeader = buildNavigationHeader(layout, value.title);

      this._navigationHeader.next(navHeader);

    } else if (value) {
      this._navigationHeader.next(value as NavigationHeader);
    }
  }


  // private methods


  private getViewLayout(view: View): Layout {
    for (const layout of APP_LAYOUTS) {
      if (layout.views.includes(view)) {
        return layout;
      }
    }
    throw Assertion.assertNoReachThisCode(`Unregistered view ${view.name}.`);
  }


  private setLayout(value: Layout) {
    if (this._currentLayout.value !== value) {
      this._currentLayout.next(value);
    }
  }

}
