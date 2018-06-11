/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Exception } from './exception';
import { Validate } from  './validate';


export class Assertion {

  // #region Static methods


  /** Asserts a condition throwing an exception if it fails.
    * @param condition The condition to assert.
    * @param failMessage The message to throw if the assertion fails.
    * @param parameters Optional strings list to merge into the throwed message.
    */
  public static assert(condition: boolean, failMessage: string, ...parameters: string[]): void {
    if (!condition) {
      let msg = this.prototype.mergeParametersIntoString(failMessage, parameters);

      throw new Exception(msg);
    }
  }


  /** Throws a noReachThisCode exception. Used to stop the execution
      when the code flow reaches an invalid code line.
    */
  public static assertNoReachThisCode(failMessage?: string): never {
    const defaultMsg = 'PROGRAMMING ERROR: The program reached an invalid code flow statement.' +
                       'Probably it has a loop, if or switch that miss an exit condition or ' +
                       'there are data with unexpected values. Please report this incident ' +
                       'immediately to the system administrator or at support @ ontica.org.';

    let msg = (failMessage && Validate.hasValue(failMessage)) ? failMessage : defaultMsg;

    throw new Exception(msg);
  }


  /** Asserts an object has value distinct to null, undefined, NaN, or an empty string or object.
    * @param object The object to check its value.
    * @param failMessage The message to throw if the assertion fails.
    * @param parameters Optional strings list to merge into the throwed message.
    */
  public static assertValue(object: any, failMessage: string, ...parameters: string[]): void {
    if (object === null || object === undefined || object === {} || object === NaN || object === '') {
      let msg = this.prototype.mergeParametersIntoString(failMessage, parameters);

      throw new Exception(msg);
    }
  }


  // #endregion Static methods

  // #region Helper methods


  /** Helper that merges a set of strings into a parmeterized message.
    */
  private mergeParametersIntoString(message: string, parameters: string[]): string {
    let temp: string = message;

    for (let i = 0; i < parameters.length; i++) {
      temp = temp.replace('{' + i.toString() + '}', parameters[i]);
    }
    return temp;
  }

  // #endregion Helper methods

}  // class Assertion
