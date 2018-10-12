/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import * as CryptoJS from 'crypto-js';

export class Cryptography {

  public static convertToMd5(value: string): string {

    return CryptoJS.MD5(value).toString();
  }

} //class Cryptography
