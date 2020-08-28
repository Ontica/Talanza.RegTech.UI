/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataSource } from '@app/models/steps';

import { StepsDataObjectsStore } from '@app/store/steps-data-objects.store';


@Component({
  selector: 'emp-data-source-selector',
  templateUrl: './data-source-selector.component.html',
  styleUrls: ["../../../styles/form.scss"]
})
export class DataSourceSelectorComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<DataSource>();

  dataSources: DataSource[] = [];
  dataSourceFamilies: string[] = [];
  filteredDataSources: DataSource[] = [];

  selectedDataSource: DataSource;

  isLoading = true;

  form = new FormGroup({
    dataSourceType: new FormControl(''),
    dataSourceFamily: new FormControl(''),
    dataSource: new FormControl('', Validators.required)
  });


  private destroyed: Subject<void> = new Subject();

  constructor(private store: StepsDataObjectsStore) { }


  ngOnInit() {
    this.loadDataSources();
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


  get isValidForm() {
    return (this.form.valid && this.selectedDataSource);
  }


  linkDataSource() {
    if (!this.isValidForm) {
      return;
    }

    this.selected.emit(this.selectedDataSource);
  }


  selectDataSource() {
    const selectedUID = this.form.get('dataSource').value;

    this.selectedDataSource = null;

    if (selectedUID) {
      this.selectedDataSource = this.dataSources.find(x => x.uid === selectedUID);
    }
  }


  updateUIControls() {
    const selectedType = this.form.get('dataSourceType').value;
    const selectedFamily = this.form.get('dataSourceFamily').value;

    this.selectedDataSource = null;

    if (selectedType && selectedFamily) {
      this.filteredDataSources = this.dataSources.filter(x => x.type === selectedType &&
                                                              x.family === selectedFamily);
    } else if (selectedType && !selectedFamily) {
      this.filteredDataSources = this.dataSources.filter(x => x.type === selectedType);

    } else if (!selectedType && selectedFamily) {
      this.filteredDataSources = this.dataSources.filter(x => x.family === selectedFamily);
    } else {
      this.filteredDataSources = this.dataSources;
    }
  }


  // private members

  private loadDataSources() {
    this.store.getDataSources()
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        (x) => {
          this.dataSources = x;
          this.dataSourceFamilies = [...new Set(x.map(y => y.family))].sort();
          this.isLoading = false;
        }
      );
  }

}
