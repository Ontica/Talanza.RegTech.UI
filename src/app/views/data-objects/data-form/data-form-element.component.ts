/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataFormField } from '@app/models/data-objects';


@Component({
  selector: 'emp-data-form-element',
  templateUrl: './data-form-element.component.html',
  styleUrls: ['../../../../styles/form.scss']
})
export class DataFormElementComponent {

  @Input() formField: DataFormField;

  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.formField.key].valid; }

}
