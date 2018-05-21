/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthenticationService } from '../../core';
import { SpinnerService } from '../../core/ui-services';


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  form = new FormGroup({
    userID: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  processing = false;
  submitted = false;
  exceptionMsg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}


  get userID() {
    return this.form.get('userID');
  }


  get password() {
    return this.form.get('password');
  }


  get showExceptionMsg() {
    return this.submitted &&
           (this.form.invalid || this.exceptionMsg.length !== 0);
  }


  ngOnInit() {
    this.authenticationService.logout()
                              .then( (x: Boolean) => this.reloadPage(x) );
  }


  onSubmit() {
    if (this.processing) {
      return;
    }

    this.startProcessing(true);

    if (!this.form.valid) {
      this.exceptionMsg = `Para ingresar requiero se proporcione
                           el nombre de usuario y la contraseña.`;

      this.startProcessing(false);
      return;
    }

    this.authenticationService.login(this.form.value.userID, this.form.value.password)
                              .then( () => this.router.navigate(['/projects/search']) )
                              .catch( x => {
                                this.exceptionMsg = x;
                                this.startProcessing(false);
                              });
  }


  // private methods

  private reloadPage(mustReload) {
    if (mustReload) {
      window.location.reload();
    }
  }


  private startProcessing(flag: boolean) {
    if (flag) {
      this.spinnerService.show();
      this.exceptionMsg = '';
      this.submitted = true;
      this.processing = true;
    } else {
      this.spinnerService.hide();
      this.processing = false;
      this.form.markAsUntouched();
    }
  }

}
