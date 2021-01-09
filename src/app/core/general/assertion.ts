/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Exception } from './exception';


export class Assertion {

  // #region Static methods


  /** Asserts a condition throwing an exception if it fails.
   * @param condition The condition to assert.
   * @param failMessage The message to throw if the assertion fails.
   */
  static assert(condition: boolean, failMessage: string): void {
    if (!condition) {
      throw new Exception(failMessage);
    }
  }


  /** Throws a noReachThisCode exception. Used to stop the execution
   *   when the code flow reaches an invalid code line.
   */
  static assertNoReachThisCode(failMessage?: string): never {
    const defaultMsg = 'PROGRAMMING ERROR: The program reached an invalid code flow statement.' +
      'Probably it has a loop, if or switch that miss an exit condition or ' +
      'there are data with unexpected values. Please report this incident ' +
      'immediately to the system administrator or at support @ ontica.org.';

    throw new Exception(failMessage || defaultMsg);
  }


  /** Asserts an object has value distinct to null, undefined, NaN, or an empty string or object.
   *  @param object The object to check its value.
   *  @param failMessage The message to throw if the assertion fails.
   */
  static assertValue(object: any, failMessage: string): void {
    const e = new Exception(`Value of '${failMessage}' can not be null, undefined or an empty object.`);

    if (object === null) {
      throw e;
    }
    if (typeof object === 'undefined') {
      throw e;
    }
    if (object === {}) {
      throw e;
    }
    if (typeof object === 'string' && object === '') {
      throw e;
    }
  }


  // #endregion Static methods

}  // class Assertion
