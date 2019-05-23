/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Assertion, Exception } from '@app/core';

import {
  APP_LAYOUTS,
  APP_VIEWS,
  VALUE_SELECTOR,
  DefaultNavigationHeader,
  DefaultView,
  Layout,
  NavigationHeader,
  View,
  buildNavigationHeader,
  getValueSelectorDefaultValue
} from '@app/models/user-interface';


@Injectable()
export class UserInterfaceStore {

  private _currentLayout: BehaviorSubject<Layout> = new BehaviorSubject<Layout>(APP_LAYOUTS['Home']);

  private _currentView: BehaviorSubject<View> = new BehaviorSubject<View>(DefaultView);

  private _navigationHeader:
                BehaviorSubject<NavigationHeader> = new BehaviorSubject(DefaultNavigationHeader);

  private _valuesMap = new Map<string, BehaviorSubject<any>>();


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


  getValue<T>(selector: VALUE_SELECTOR, defaultValue?: T): Observable<T> {
    if (this._valuesMap.has(selector)) {
      const subject = this._valuesMap.get(selector) as BehaviorSubject<T>;

      return subject.asObservable();

    } else {
      defaultValue = defaultValue || getValueSelectorDefaultValue(selector) as T;
      const subject = new BehaviorSubject<T>(defaultValue);

      this._valuesMap.set(selector, subject);

      return subject.asObservable();
    }
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


  setValue<T>(selector: VALUE_SELECTOR, value: T) {
    if (!this._valuesMap.has(selector)) {
      this._valuesMap.set(selector, new BehaviorSubject<T>(value));
    } else {
      const subject = this._valuesMap.get(selector) as BehaviorSubject<T>;

      subject.next(value);
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
