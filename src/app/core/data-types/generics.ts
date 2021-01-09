/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable } from 'rxjs';


export function resolve<U>(value?: U): Promise<U> {
  if (value) {
    return Promise.resolve<U>(value);
  } else {
    return Promise.resolve() as any as Promise<U>;
  }
}


export function toObservable<U>(value: Observable<any>): Observable<U> {
  return value as Observable<U>;
}


export function toPromise<U>(value: Promise<any> | Observable<any>): Promise<U> {
  if (value instanceof Observable) {
    return value.toPromise<U>();

  } else if (value instanceof Promise) {
    return value as Promise<U>;

  } else {
    return Promise.resolve<U>(value);
  }
}
