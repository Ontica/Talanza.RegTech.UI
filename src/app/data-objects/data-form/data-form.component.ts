/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EventInfo } from '@app/core/data-types';
import { DataFormField, DataObject } from '@app/models/data-objects';

import { DataFormService } from '@app/services/data-objects';

import { FormGroupTransformer } from './form-group-transformer';


@Component({
  selector: 'emp-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ["../../../styles/form.scss"],
  providers: [ FormGroupTransformer ]
})
export class DataFormComponent implements OnChanges {

  @Input() dataObject: DataObject;

  @Output() formEvent = new EventEmitter<EventInfo>();

  formFields: DataFormField[] = [];

  form: FormGroup = new FormGroup({});

  isLoading = false;


  constructor(private qcs: FormGroupTransformer,
              private qs: DataFormService) { }


  ngOnChanges(): void {
    this.qs.getFormFields(this.dataObject).subscribe(
      x => {
        this.formFields = x;
        this.form = this.qcs.toFormGroup(this.formFields);
      }
    );
  }


 onSubmit() {
    this.save();
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const event = {
      type: 'save',
      payload: {
        formData: JSON.stringify(this.form.getRawValue())
      }
    };

    this.formEvent.emit(event);

    this.qs.saveFormData(this.dataObject, event.payload.formData);
  }


  isValid(questionKey: string) {
    return this.form.controls[questionKey].valid;
  }

}
