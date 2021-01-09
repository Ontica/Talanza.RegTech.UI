/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { DataSource } from '@app/models/data-objects';

import { StepRequirement } from '@app/models/steps';

import { DataObjectsService } from '@app/data-services/data-objects';


@Component({
  selector: 'emp-steps-requirement-editor',
  templateUrl: './requirement-editor.component.html',
  styleUrls: ['../../../../styles/form.scss']
})
export class RequirementEditorComponent implements OnInit, OnDestroy {

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


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
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
    if (!this.isValid) {
      return;
    }

    const data = this.getFormData();

    this.selected.emit(data);
  }


  // private members

  private getFormData(): StepRequirement {
    const formModel = this.form.value;

    const data = {
      uid: null,
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
