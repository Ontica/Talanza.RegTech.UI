/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/core';

import { AbstractForm } from '@app/shared/services';


enum FormMessages {

  IncompleteLoginData =
    'Please provide your user name and password.',

}


@Component({
  selector: 'emp-ng-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent extends AbstractForm implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    super();
  }


  get Msg(): typeof FormMessages {
    return FormMessages;
  }


  ngOnInit() {
    this.authenticationService.logout()
        .then((x: boolean) => this.reloadPage(x));
  }


  // abstract methods implementation


  protected createFormGroup(): FormGroup {

    return new FormGroup({

      userID: new FormControl('', Validators.required),

      password: new FormControl('', Validators.required)

    });

  }


  protected execute(): Promise<any> {
    switch (this.command.name) {

      case 'authenticate':
        return this.authenticate();

      default:
        throw new Error(`Command '${this.command.name}' doesn't have a command handler.`);
    }
  }


  protected validate(): Promise<any> {
    if (!this.valid) {
      this.addException(FormMessages.IncompleteLoginData);
    }

    return Promise.resolve();
  }


  // private methods

  private authenticate(): Promise<boolean> {
    return this.authenticationService.login(this.form.value.userID, this.form.value.password)
               .then(() => this.router.navigate(['/home']));
  }


  private reloadPage(mustReload: boolean) {
    if (mustReload) {
      window.location.reload();
    }
  }

}
