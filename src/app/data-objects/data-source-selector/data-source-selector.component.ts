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

import { DataSource, EmptyDataSource } from '@app/models/data-objects';

import { DataObjectsStore } from '@app/store/data-objects.store';
import { DataObjectsService } from '@app/services/data-objects';


@Component({
  selector: 'emp-data-source-selector',
  templateUrl: './data-source-selector.component.html',
  styleUrls: ["../../../styles/form.scss"]
})
export class DataSourceSelectorComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<DataSource>();

  dataSources: DataSource[] = [];
  families: string[] = [];

  filteredDataSources: DataSource[] = [];
  selectedDataSource: DataSource = EmptyDataSource;

  isLoading = true;

  form = new FormGroup({
    family: new FormControl(''),
    keywords: new FormControl(''),
    dataSource: new FormControl('', Validators.required)
  });


  private destroyed: Subject<void> = new Subject();

  constructor(private store: DataObjectsService) { }


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


  setFilter() {
    const keywords = this.form.get('keywords').value.toLowerCase();
    const family = this.form.get('family').value;

    if (keywords && family) {
      this.filteredDataSources = this.dataSources.filter(x => x.name.toLowerCase().includes(keywords) &&
                                                         x.family === family);
    } else if (keywords && !family) {
      this.filteredDataSources = this.dataSources.filter(x => x.name.toLowerCase().includes(keywords));
    } else if (!keywords && family) {
      this.filteredDataSources = this.dataSources.filter(x => x.family === family);
    } else {
      this.filteredDataSources = this.dataSources;
    }

    if (!this.filteredDataSources.includes(this.selectedDataSource)) {
      this.selectedDataSource = EmptyDataSource;
    }
  }


  // private members

  private loadDataSources() {
    this.store.getDataSources()
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        (x) => {
          this.dataSources = x;
          this.families = [...new Set(x.map(y => y.family))].sort();
          this.setFilter();
          this.isLoading = false;
        }
      );
  }

}
