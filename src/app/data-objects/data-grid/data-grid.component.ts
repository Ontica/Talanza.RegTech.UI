/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

import { EventInfo } from '@app/core/data-types';

import { Identifiable, isEmpty } from '@app/models/core';
import { DataObject } from '@app/models/data-objects';

import { DataFormService } from '@app/services/data-objects';


@Component({
  selector: 'emp-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['../../../styles/general-styles.scss', '../../../styles/syncfusion-styles.scss']
})
export class DataGridComponent implements OnChanges {

  @Input() dataObject: DataObject;

  dataSource: Identifiable[] = [];

  currentRow: Identifiable;

  displayEditor = false;
  isLoading = true;

  constructor(private service: DataFormService) { }


  ngOnChanges(): void {
    this.loadDataSource();
  }


  addRow() {
    this.currentRow = null;
    this.displayEditor = true;
  }



  cloneRow() {
    if (this.currentRow) {
      this.displayEditor = true;
    }

    const copied = Object.assign({ }, this.currentRow);
    const clone = Object.assign(copied, { uid: ''});

    this.currentRow = clone;
    this.displayEditor = true;

  }


  deleteRow() {
    if (!this.currentRow) {
      return;
    }

    if (!confirm('Delete the selected record?')) {
      return;
    }

    const event: EventInfo = {
      type: 'deleted',
      payload: {
        uid: this.currentRow.uid,
        formData: JSON.stringify(this.currentRow)
      }
    };

    this.onFormEvent(event);
  }


  hideEditor() {
    this.displayEditor = false;
  }


  onFormEvent(event: EventInfo) {
    this.isLoading = true;

    return this.service.saveFormData(this.dataObject, event)
      .then(() => {
        this.loadDataSource();

        this.displayEditor = false;

        this.isLoading = false;
      }
    );
  }


  selectRow(selectedRow: Identifiable) {
    this.currentRow = selectedRow;
  }


  updateRow() {
    if (this.currentRow) {
      this.displayEditor = true;
    }
  }


  // private methods

  private loadDataSource() {
    this.service.getGridFormDataSource<any>(this.dataObject)
                .toPromise()
                .then(
      x => {
        this.dataSource = x;

        if (!isEmpty(this.currentRow)) {
          const findResult = this.dataSource.find((y) => y.uid === this.currentRow.uid);

          if (findResult) {
            this.selectRow(findResult);
          }
        }

        this.isLoading = false;
      }
    );
  }

}
