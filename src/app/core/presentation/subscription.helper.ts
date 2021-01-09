/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PresentationLayer } from './presentation-layer';

import { StateSelector } from './presentation-types';


export class SubscriptionHelper {

  private unsubscribe: Subject<void> = new Subject();

  constructor(private uiLayer: PresentationLayer) { }


  select<U>(stateSelector: StateSelector, params?: any): Observable<U> {
    return this.uiLayer.select<U>(stateSelector, params)
      .pipe(takeUntil(this.unsubscribe));
  }


  subscribe<U>(stateSelector: StateSelector, callback?: (x: U) => void): Subscription {
    return this.uiLayer.select<U>(stateSelector)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => callback(x));
  }


  destroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
