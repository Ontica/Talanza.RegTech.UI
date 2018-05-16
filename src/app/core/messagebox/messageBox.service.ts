import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface MessageBox {
  title: string;
  message: string;
  show: boolean;
}

@Injectable()
export class MessageBoxService {

  private _messageBoxSubject = new Subject<MessageBox>();

  constructor() {
    // no-op
  }


  public get messageBoxState(): Observable<MessageBox> {
    return this._messageBoxSubject.asObservable();
  }


  public show(message: string, title:string) {
    this._messageBoxSubject.next(<MessageBox> { show: true, title: title, message: message });
  }


}
