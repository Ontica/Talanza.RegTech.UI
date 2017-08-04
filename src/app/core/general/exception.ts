/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { HttpErrorResponse } from '@angular/common/http';

/* tslint:disable:max-classes-per-file */

export class Exception extends Error {

  public readonly code: string;
  public readonly innerError: Error;

  constructor(message: string, innerError?: Error) {
    super(Exception.extractErrorMessage(message));

    // This line is because a Typecript to ECMA5 issue: https://goo.gl/jtiFyy
    Object.setPrototypeOf(this, Exception.prototype);

    this.innerError = innerError;
    this.code = Exception.extractErrorCode(message);
  }

  public static convertTo(sourceErr: any, defaultMessage?: string): Exception {
    if (!sourceErr) {
      return new Exception(defaultMessage || `Error con valor 'undefined' o 'null'.`); // 'UNDEFINED_ERROR'

    } else if (sourceErr instanceof HttpErrorResponse) {
      return new Exception(defaultMessage || sourceErr.error.message, sourceErr.error);

    } else if (sourceErr instanceof Exception) {
      return new Exception(defaultMessage || sourceErr.message, sourceErr);

    } else if (sourceErr instanceof Error) {
      return new Exception(defaultMessage || sourceErr.message, sourceErr);

    } else {
      return new Exception(defaultMessage || sourceErr.message, sourceErr);
    }
  }

  public show(): void {
    let errMsg = 'Tengo un problema.\n\n';

    errMsg += this.message + '\n\n';
    errMsg += `Código: ${this.code}\n\n`;
    if (this.innerError) {
      if (this.innerError instanceof Exception) {
        errMsg += `Error interno: [${this.innerError.code}] ${this.innerError.message}`;
      } else {
        errMsg += `Error interno: ${this.innerError.message}`;
      }
    }
    alert(errMsg);
  }

  private static extractErrorCode(fullMessage: string): string {
    const errorCode = fullMessage.match(/\[(.*?)\]/g);

    if (errorCode) {
      return errorCode.toString().replace('[', '').replace(']', '');
    } else {
      return 'UNDEFINED_ERR';
    }
  }

  private static extractErrorMessage(fullMessage: string): string {
    const errorCode = this.extractErrorCode(fullMessage);

    return fullMessage.replace(`[${errorCode}]`, '')
                      .trim();
  }

}

export interface HttpExceptionData {
  request: any;
  response: any;
}

export class HttpException extends Exception {

  public readonly request: any;
  public readonly response: any;

  constructor(message: string, innerException?: Error, _initData?: HttpExceptionData) {
    super(message, innerException);

    // This line is because a Typecript to ECMA5 issue: https://goo.gl/jtiFyy
    Object.setPrototypeOf(this, HttpException.prototype);

    this.request = _initData.request;
    this.response = _initData.response;
  }

}
