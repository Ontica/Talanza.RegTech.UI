import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface SpinnerState {
  show: boolean;
}

@Injectable()
export class SpinnerService {

  private _spinnerSubject = new Subject<SpinnerState>();

  constructor() {
    // no-op
  }

  public get spinnerState(): Observable<SpinnerState> {
    return this._spinnerSubject.asObservable();
  }

  public show() {
    this._spinnerSubject.next(<SpinnerState> { show: true });
  }

  public hide() {
    this._spinnerSubject.next(<SpinnerState> { show: false });
  }

}
