/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { ReflectiveInjector } from '@angular/core';

import { AbstractControl, FormGroup } from '@angular/forms';

import { Assertion } from '../general/assertion';

import { Exception } from '../general/exception';

import { Displayable }  from '../ui-data-types';
import { SpinnerService }  from '../spinner/spinner.service';

export interface Command {
  name: string;
  pars?: object[];
}

export interface FormSubmitOptions {
  skipFormValidation?: boolean;
}

const enum FormMessages {

  CantSetCommandWhileProcessing =
  "Command can't be changed because there is still a pending operation executing.",

  InvalidFormWithUnregisteredException =
  "Programming error. The form is invalid (form.valid == false) and there are no exception messages registered.",

}

export abstract class AbstractForm {

  /// abstract methods

  protected abstract execute(): Promise<any>;

  protected abstract createFormGroup(): FormGroup;

  protected abstract validate(): Promise<any>;


  /// fields and constructor

  protected form : FormGroup;
  private spinner: Displayable;

  private currentCommand: Command = { name: ''};
  private disabledFlag = false;
  private submittedFlag = false;
  private processing = false;

  private exceptionsArray: string[] = [];

  constructor() {
    this.form = this.createFormGroup();
  }

  /// properties

  get command(): Command {
    return this.currentCommand;
  }


  get disabled(): boolean {
    return this.disabledFlag;
  }


  get enabled(): boolean {
    return !this.disabledFlag;
  }


  get exceptionMsg(): string {
    return this.exceptionsArray.join("<br />");
  }


  get invalid(): boolean {
    return !this.valid;
  }


  get submitted(): boolean {
    return this.submittedFlag;
  }


  get showExceptionMsg(): boolean {
    return this.submitted && (this.invalid);
  }


  get valid(): boolean {
    return this.form.valid && (this.exceptionsArray.length === 0);
  }


  /// public methods

  protected addException(exception: Exception |Error | string): void {

    if (typeof exception === 'string') {
      this.exceptionsArray.push(exception as string);

    } else if (exception instanceof Exception) {
      this.exceptionsArray.push(`${(exception as Exception).message}:<br><br>
                                 ${(exception as Exception).innerError.message}`);

    } else if (exception instanceof Error) {
      this.exceptionsArray.push((exception as Error).message);

    } else {
      this.exceptionsArray.push(exception);
    }

  }


  protected cleanExceptions() {
    this.exceptionsArray = [];
  }


  disable(opts?: { onlySelf?: boolean, emitEvent?: boolean }): void {
    this.disabledFlag = true;

    this.form.disable(opts);
  }


  enable(opts?: { onlySelf?: boolean, emitEvent?: boolean }): void {
    this.disabledFlag = false;

    this.form.enable(opts);
  }


  get(path: string | (string | number)[]): AbstractControl {
    return this.form.get(path);
  }


  protected keyboardHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }

    if (event.srcElement.tagName === 'TEXTAREA') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    // ToDo: How to simulate tab keypress when ENTER key pressed?
    // var newEvent = new KeyboardEvent("keypress",
    //                                  { code : "Tab", key: "Tab", bubbles: true, cancelable : true });
    // source.dispatchEvent(newEvent);
  }


  protected onSubmit(options?: FormSubmitOptions): void {
    try {

      if (this.processing) {
        return;
      }

      this.startProcessing(true);

      if (options && options.skipFormValidation) {
        this.invokeExecute();

      } else {
        this.validate()
            .then( () => this.afterValidate() );

      }

    } catch (error) {
      this.addException(error);

      this.startProcessing(false);
    }

  }


  set(path: string | (string | number)[], value: any) {
    this.form.get(path).setValue(value);
  }


  protected setCommand(command: Command | string): void {
    Assertion.assertValue(command, 'command');

    Assertion.assert(!this.processing, FormMessages.CantSetCommandWhileProcessing);

    if (typeof command === 'string') {
      this.currentCommand = { name: command as string };

    } else {
      this.currentCommand = command;

    }
  }


  protected setSpinner(spinner: Displayable) {
    this.spinner = spinner;
  }


  value(path: string | (string | number)[]): any {
    return this.get(path).value;
  }


  // private methods

  private afterValidate(): void {
    try {

      if (this.valid) {
        this.invokeExecute();

        return;
      }

      // invalid form

      if (this.exceptionsArray.length === 0) {
        const msg = FormMessages.InvalidFormWithUnregisteredException;

        this.addException(msg);

        console.log(msg);
      }

      this.startProcessing(false);

    } catch (error) {
      this.addException(error);

      this.startProcessing(false);
    }

  }


  private invokeExecute(): void {
    this.execute()
        .then( () => this.startProcessing(false) )
        .catch( error => {
          this.addException(error);
          this.startProcessing(false);
        });
  }


  private setDefaultSpinner() {
    const providers = ReflectiveInjector.resolve([SpinnerService]);

    const injector = ReflectiveInjector.fromResolvedProviders(providers);

    this.spinner = injector.get(SpinnerService) as SpinnerService;

    console.log("setDefaultSpinner ");
  }


  private startProcessing(flag: boolean) {
    if (!this.spinner) {
      this.setDefaultSpinner();
    }

    if (flag) {
      this.spinner.show();
      this.processing = true;
      this.exceptionsArray = [];
      this.submittedFlag = true;

    } else {
      this.spinner.hide();
      this.form.markAsUntouched();
      this.processing = false;
    }
  }

}
