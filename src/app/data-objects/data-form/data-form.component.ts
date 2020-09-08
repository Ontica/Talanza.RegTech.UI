/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EventInfo } from '@app/core/data-types';

import { Identifiable, isEmpty } from '@app/models/core';
import { DataFormField, DataObject } from '@app/models/data-objects';

import { DataFormService } from '@app/services/data-objects';

import { FormGroupTransformer } from './form-group-transformer';


@Component({
  selector: 'emp-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ["../../../styles/form.scss"],
  providers: [ FormGroupTransformer ]
})
export class DataFormComponent implements OnInit, OnChanges {

  @Input() dataObject: DataObject;

  @Input() data: Identifiable;

  @Output() formEvent = new EventEmitter<EventInfo>();


  formFields: DataFormField[] = [];

  form: FormGroup = new FormGroup({});


  actionButtonLabel = 'Save';

  isLoading = true;

  submitted = false;

  constructor(private qcs: FormGroupTransformer,
              private qs:  DataFormService) { }


  ngOnInit(): void {

  }


  ngOnChanges(): void {
    this.qs.getFormFields(this.dataObject).subscribe(
      x => {
        this.formFields = x;
        this.form = this.qcs.toFormGroup(this.formFields, this.data);
        this.setActionButtonLabel();
        this.isLoading = false;
      }
    );
  }


  onSubmit() {
    this.submitted = true;

    this.save();
  }


  isValid(questionKey: string) {
    return this.form.controls[questionKey].valid;
  }


  save() {
    if (!this.form.valid) {
      return;
    }

    if (isEmpty(this.data)) {
      this.create();
    } else {
      this.update();
    }
  }


  // private methods


  private create() {
    const event: EventInfo = {
      type: 'created',
      payload: {
        formData: JSON.stringify(this.form.getRawValue())
      }
    };

    this.formEvent.emit(event);
  }


  private setActionButtonLabel() {
    if (this.data === null) {
      this.actionButtonLabel = 'Add new';
    } else if (this.data !== null && !this.data.uid) {
      this.actionButtonLabel = 'Add clone';
    } else if (this.data !== null && this.data.uid) {
      this.actionButtonLabel = 'Save changes'
    }
  }


  private update() {
    const event: EventInfo = {
      type: 'updated',
      payload: {
        uid: this.data.uid,
        formData: JSON.stringify(this.form.getRawValue())
      }
    };

    this.formEvent.emit(event);
  }

}
