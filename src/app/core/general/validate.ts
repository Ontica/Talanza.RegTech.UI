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
  public static hasValue(object: any): boolean {
    if (object === null || object === undefined || object === {} || object === NaN || object === '') {
      return false;
    }
    return true;
  }

  public static isEmail(value: string): boolean {
    if (!this.hasValue(value)) {
      return false;
    }
    let emailExp: string = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$';
    let regularExpresion = new RegExp(emailExp);
    let test = regularExpresion.test(value);
    return test;
  }

  public static isTrue(value: boolean): boolean {
    return value === true;
  }

  public static notNull(value: any): boolean {
    if ((value === null) || (value === undefined) || value === NaN || value === {}) {
      return false;
    }
    return true;
  }

  // #endregion Static methods

}  // class Validate
