/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { ReflectiveInjector } from '@angular/core';

import { AbstractControl, FormGroup } from '@angular/forms';

import { Assertion } from 'empiria';
import { CoreService } from '../core.service';
import { Displayable, SpinnerService }  from '../ui-services';

export interface Command {
  name: string;
  pars?: object[];
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


  get exceptionMsg(): string {
    return this.exceptionsArray.join("<br />");
  }


  get submitted(): boolean {
    return this.submittedFlag;
  }


  get showExceptionMsg(): boolean {
    return this.submitted &&
           (this.form.invalid || this.exceptionsArray.length !== 0);
  }


  get valid(): boolean {
    return this.form.valid;
  }


  /// public methods

  protected addException(exception: Error | string): void {

    if (typeof exception === 'string') {
      this.exceptionsArray.push(exception as string);

    } else {
      this.exceptionsArray.push((exception as Error).message);

    }
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


  protected onSubmit(): void {
    try {

      if (this.processing) {
        return;
      }

      this.startProcessing(true);

      this.validate()
          .then( () => this.afterValidate() );

    } catch (error) {
      this.addException(error);

      this.startProcessing(false);
    }

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


  // private methods

  private afterValidate(): void {
    try {

      if (this.form.valid) {
        this.invokeExecute();

        return;
      }

      // form is not valid

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
