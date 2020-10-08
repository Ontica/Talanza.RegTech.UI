/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SecurityDataService } from '@app/core/security/security-data.service';
import { EventInfo } from '@app/core/data-types';



@Component({
  selector: 'emp-ng-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../../../styles/form.scss']
})
export class ChangePasswordComponent {

  @Output() formEvent = new EventEmitter<EventInfo>();

  form = new FormGroup({
    name: new FormControl(''),
    current: new FormControl('', Validators.required),
    new: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm: new FormControl('', Validators.required)
  });

  submitted = false;

  constructor(private service: SecurityDataService) { }


  get isValidForm() {
    return this.form.valid && this.passwordsMatch();
  }


  isValid(control: string) {
    if (control === 'new') {
      return this.form.controls[control].valid && !this.isEqualsThanCurrent();
    }
    if (control === 'confirm') {
      return this.form.controls[control].valid && this.passwordsMatch();
    }
    return this.form.controls[control].valid;
  }


  validationMsg(control: string): string {
    if (this.isValid(control)) {
      return '';
    }

    const value = this.form.get(control).value;

    if (value === '') {
      return '* Required';
    }

    if (control === 'new') {
      if (value.length < 8 ) {
        return 'Must be at least 8 characters in length.';
      } else if (this.isEqualsThanCurrent()) {
        return 'Current and new password are the same.';
      }
    }

    if (control === 'confirm') {
      return 'New and confirmation passwords do not match.';
    }

    return '';
  }


  onSubmit() {
    this.submitted = true;

    this.changePassword();
  }


  // Private methods

  private changePassword() {
    if (!this.isValidForm) {
      return;
    }

    const event: EventInfo = {
      type: 'change-password',
      payload: {
        formData: JSON.stringify(this.form.getRawValue())
      }
    };

    this.service.changePassword(event)
      .then(() => alert('password changed ok'))
      .catch((e) => {
        if (!e?.error?.message) {
          alert('Your password has been changed.');
          this.formEvent.emit();
        } else {
          alert(e?.error?.message);
        }
        }
      );
  }


  private isEqualsThanCurrent() {
    const current = this.form.get('current').value;
    const newPassword = this.form.get('new').value;

    return (current === newPassword);
  }


  private passwordsMatch() {
    const newPassword = this.form.get('new').value;
    const confirm = this.form.get('confirm').value;

    return (newPassword === confirm);
  }

}
