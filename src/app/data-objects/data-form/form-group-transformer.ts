import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataFormField } from '@app/models/data-objects';

@Injectable()
export class FormGroupTransformer {

  constructor() { }

  toFormGroup(questions: DataFormField[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
