/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Exception } from '@app/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MessageBoxComponent } from './message-box.component';

import { ConfirmMessageBoxType, MessageBoxConfig, MessageBoxData } from './message-box.types';


@Injectable()
export class MessageBoxService {

  constructor(private dialog: MatDialog) { }


  confirm(message: string, title: string = '',
          messageBoxType: ConfirmMessageBoxType = 'AcceptCancel',
          mainButtonText: string = 'Aceptar',
          config?: MessageBoxConfig): Observable<boolean> {

    const data: MessageBoxData = {
      messageBoxType: messageBoxType || 'AcceptCancel',
      message: message,
      title: title || 'Tengo una pregunta',
      mainButtonText: mainButtonText || 'Aceptar'
    };

    const _observable = this.openMessageBox(config, data);

    _observable.subscribe(
      result => {
        if (result) {
          return of<boolean>(true);
        } else {
          return of<boolean>(false);
        }
      }
    );

    return _observable;
  }


  show(message: string, title: string = '',
       config?: MessageBoxConfig): Observable<void> {

    const data: MessageBoxData = {
      messageBoxType: 'Accept',
      message: message,
      title: title,
      mainButtonText: 'Aceptar'
    };

    const _observable = this.openMessageBox(config, data);

    _observable.subscribe( () => of<void>() );

    return _observable;
  }


  showError(error: Error | any,
            config?: MessageBoxConfig): Observable<void> {

    const data: MessageBoxData = {
      messageBoxType: 'Accept',
      message: this.getErrorMsg(error),
      title: 'Tengo un problema',
      mainButtonText: 'Aceptar'
    };

    const _observable = this.openMessageBox(config, data);

    _observable.subscribe( () => of<void>() );

    return _observable;
  }


  // private methods


  private getDialogConfig(config: MessageBoxConfig,
                          messageBoxData: MessageBoxData): MatDialogConfig<MessageBoxData> {
    if (!config) {
      config = new MatDialogConfig<MessageBoxData>();
    }

    config.disableClose = config.disableClose || true;
    config.autoFocus = config.autoFocus || true;
    config.role = config.role || 'alertdialog';

    config.minWidth = config.minWidth || '380px';
    config.maxWidth = config.maxWidth || '500px';

    config.width = config.width || '500px';

    config.data = Object.assign(messageBoxData, config.data);

    return config;
  }


  private getErrorMsg(error: Error | Exception | string | any): string {
    if (!error) {
      return 'Error desconocido';

    } else if (error instanceof Exception) {
      return this.getExceptionMessage(error as Exception);

    } else if (error instanceof Error) {
      return (error as Error).message;

    } else if (typeof(error) === 'string') {
      return error;
    } else {
      return JSON.stringify(error).toString();
    }

  }

  private getExceptionMessage(exception: Exception): string {
    if (exception.innerError &&
        exception.innerError.message.localeCompare(exception.message) !== 0) {
      return `${exception.message}<br/><br/>${exception.innerError.message}`;
    } else {
      return exception.message || 'Error desconocido';
    }
  }


  private openMessageBox(config: MessageBoxConfig, data: MessageBoxData): Observable<any> {
    const dialogConfig = this.getDialogConfig(config, data);

    const dialogRef = this.dialog.open(MessageBoxComponent, dialogConfig);

    return dialogRef.afterClosed();
  }

}
