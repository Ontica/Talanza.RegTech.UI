/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export class Validate {

  // #region Static methods

  /** Returns false if the object value is equal to null, undefined, NaN, an empty
      string or an empty object.
    * @param object The object to check its value.
    */
  static hasValue(object: any): boolean {
    if (object === null || object === undefined || object === {} || object === NaN || object === '') {
      return false;
    }
    return true;
  }

  static isEmail(value: string): boolean {
    if (!this.hasValue(value)) {
      return false;
    }
    const emailExp = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$';
    const regularExpresion = new RegExp(emailExp);
    const test = regularExpresion.test(value);
    return test;
  }

  static isTrue(value: boolean): boolean {
    return value === true;
  }

  static notNull(value: any): boolean {
    if ((value === null) || (value === undefined) || value === NaN || value === {}) {
      return false;
    }
    return true;
  }

  // #endregion Static methods

}  // class Validate
