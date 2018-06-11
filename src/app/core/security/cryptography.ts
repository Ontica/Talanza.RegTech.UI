/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export class Cryptography {

  public static convertToMd5(value: string): string {
    var md5 = require('crypto-js/md5');

    return md5(value).toString();
  }

} //class Cryptography
