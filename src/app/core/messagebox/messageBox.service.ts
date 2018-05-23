import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Exception } from '..';

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


  public show(message: string | Error | Exception,
              title?: string) {
    let displayMsg = '';
    let displayTitle = ''

    if (typeof message === 'string') {
      displayMsg = message;

      displayTitle = title || '';

    } else if (message instanceof Exception) {
      displayMsg = (message as Exception).message;
      displayMsg += "<br><br>";
      displayMsg += (message as Exception).innerError.message;

      displayTitle = title || 'Excepción';

    } else if (message instanceof Error) {
      displayMsg = (message as Error).message;

      displayTitle = title || 'Excepción';

    } else {
      displayMsg = message;

      displayTitle = title || '';
    }

    this._messageBoxSubject.next({ show: true, title: displayTitle, message: displayMsg });

  }

}
