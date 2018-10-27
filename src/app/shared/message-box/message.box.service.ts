/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MatDialog, MatDialogConfig } from "@angular/material";

import { MessageBoxComponent } from './message-box.component';

import { MessageBoxType, MessageBoxConfig, MessageBoxData } from './message-box.types';


@Injectable()
export class MessageBoxService {

  constructor(private dialog: MatDialog) { }


  confirm(message: string, title: string = "",
          messageBoxType: MessageBoxType = 'AcceptCancel',
          mainButtonText: string = 'Aceptar',
          config: MessageBoxConfig = undefined): Observable<boolean> {

    const data : MessageBoxData = {
      messageBoxType: messageBoxType || 'AcceptCancel',
      message: message,
      title: title || 'Tengo una pregunta',
      mainButtonText: mainButtonText || 'Aceptar'
    };

    const dialogConfig = this.getDialogConfig(config, data);

    const dialogRef = this.dialog.open(MessageBoxComponent, dialogConfig);

    const _observable = dialogRef.afterClosed();

    _observable.subscribe (
        result => {
          console.log(result, "result");

        if (result) {
          return of<boolean>(true);
        } else {
          return of<boolean>(false);
        }
      }
    );

    return _observable;
  }


  // private methods


  private getDialogConfig(config: MessageBoxConfig, messageBoxData: MessageBoxData) : MatDialogConfig<MessageBoxData> {
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

}
