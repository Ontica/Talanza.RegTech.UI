/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Output, EventEmitter, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { DataSource } from '@app/models/data-objects';

import { EmptyStepRequirement, StepRequirement } from '@app/models/steps';

import { DataObjectsService } from '@app/data-services/data-objects';
import { isEmpty } from '@app/core';


@Component({
  selector: 'emp-steps-requirement-editor',
  templateUrl: './requirement-editor.component.html'
})
export class RequirementEditorComponent implements OnInit, OnChanges, OnDestroy {

  @Input() requirement: StepRequirement = EmptyStepRequirement;
  @Input() readonly = false;

  @Output() selected = new EventEmitter<StepRequirement>();

  dataObjects: DataSource[] = [];

  filteredDataObjects: Observable<DataSource[]> = of([]);

  isLoading = true;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    dataObject: new FormControl(''),
    optional: new FormControl('', Validators.required),
    legalBasis: new FormControl('')
  });


  private destroyed: Subject<void> = new Subject();

  constructor(private store: DataObjectsService) { }


  ngOnInit() {
    this.loadDataSources();

    this.filteredDataObjects = this.form.get('dataObject').valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  ngOnChanges() {
    this.form.reset();
    if (!isEmpty(this.requirement)) {
      this.rebuildForm();
    }
    if (this.readonly) {
      this.form.disable();
    }
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


  private rebuildForm() {
    this.form.reset({
      name: this.requirement.name,
      description: this.requirement.description,
      dataObject: this.requirement.dataObject,
      optional: this.requirement.optional,
      legalBasis:this.requirement.legalBasis
    });
  }


  private _filter(value: string | DataSource): DataSource[] {
    const filterValue = value && typeof value === 'string' ? value.toLowerCase() : '';

    return this.dataObjects.filter(x => x.name.toLowerCase().includes(filterValue));
  }


  displayFn(value: DataSource): string {
    return value && value.name ? value.name : '';
  }

  get isValid() {
    return this.form.valid;
  }


  saveStepRequirement() {
    if (this.readonly || !this.isValid) {
      return;
    }

    const data = this.getFormData();

    this.selected.emit(data);
  }


  // private members

  private getFormData(): StepRequirement {
    const formModel = this.form.value;

    console.log(this.requirement.uid);

    const data = {
      uid: this.requirement.uid,
      name: formModel.name,
      description: formModel.description,
      dataObject: formModel.dataObject,
      optional: formModel.optional,
      legalBasis: formModel.legalBasis
    };

    return data;
  }

  private loadDataSources() {
    this.store.getDataSources()
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        (x) => {
          this.dataObjects = x;
          this.isLoading = false;
        }
      );
  }
}
