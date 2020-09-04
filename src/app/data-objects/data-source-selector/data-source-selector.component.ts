/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isEmpty } from '@app/models/core';
import { DataSource, EmptyDataSource } from '@app/models/data-objects';

import { DataObjectsService } from '@app/services/data-objects';


@Component({
  selector: 'emp-data-source-selector',
  templateUrl: './data-source-selector.component.html',
  styleUrls: ["../../../styles/form.scss"]
})
export class DataSourceSelectorComponent implements OnInit, OnDestroy {

  @Output() selected = new EventEmitter<DataSource>();

  dataSources: DataSource[] = [];

  filteredDataSources: DataSource[] = [];
  selectedDataSource: DataSource = EmptyDataSource;

  isLoading = true;

  form = new FormGroup({
    keywords: new FormControl('')
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
    return (this.form.valid && !isEmpty(this.selectedDataSource));
  }


  linkDataSource() {
    if (!this.isValidForm) {
      return;
    }

    this.selected.emit(this.selectedDataSource);
  }


  selectDataSource(selectedUID: string) {
    this.selectedDataSource = EmptyDataSource;

    if (selectedUID) {
      this.selectedDataSource = this.dataSources.find(x => x.uid === selectedUID);
    }
  }


  setFilter() {
    const keywords = this.form.get('keywords').value.toLowerCase();

    if (keywords) {
      this.filteredDataSources = this.dataSources.filter(x => x.name.toLowerCase().includes(keywords));
    } else {
      this.filteredDataSources = this.dataSources;
    }

    if (!this.filteredDataSources.includes(this.selectedDataSource)) {
      this.selectedDataSource = EmptyDataSource;
    }
  }


  testSelect(event: any) {
    console.log('event', event);
  }

  // private members

  private loadDataSources() {
    this.store.getDataSources()
      .pipe(takeUntil(this.destroyed))
      .subscribe(
        (x) => {
          this.dataSources = x;
          this.setFilter();
          this.isLoading = false;
        }
      );
  }

}
