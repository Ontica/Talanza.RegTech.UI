/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ElementRef,
         OnInit, OnDestroy, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DataObjectsService } from '@app/data-services/data-objects';


@Component({
  selector: 'emp-data-dashboard-main-page',
  templateUrl: './dashboard-main-page.component.html',
  styleUrls: ['./dashboard-main-page.component.scss']
})
export class DashboardMainPageComponent implements OnInit, OnDestroy {

  @ViewChild('gridContainer', { static: true }) container: ElementRef;

  constructor(private service: DataObjectsService) {}

  gridColumns = 4;
  tileWidth = 270;

  private containerWidth = 0;

  private subs: Subscription;

  primaryXAxis: Object;
  primaryYAxis: Object;
  chartData: Object[];


  ngOnInit() {
    this.subs = interval(1000).subscribe(
      (() => this.setGridColumns())
    );


    this.service.getGraphData().then(
      (x => this.chartData = x));


    this.primaryXAxis = {
        valueType: 'Category'
    };
    this.primaryYAxis = {
        labelFormat: '{value}'
    };

  }


  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


  // private methods


  private setGridColumns() {
    const maxGridColumns = 6;

    if (this.containerWidth === this.container.nativeElement.offsetWidth) {
      return;
    }

    this.containerWidth = this.container.nativeElement.offsetWidth;

    let cols = this.containerWidth / this.tileWidth;

    cols = Math.round(cols);

    if (cols > maxGridColumns) {
      this.gridColumns = maxGridColumns;
    } else if (cols >= 1) {
      this.gridColumns = cols;
    } else {
      this.gridColumns = 1;
    }
  }

}
