/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'obligations-filter',
  templateUrl: './obligations-filter.component.html',
  styleUrls: ['./obligations-filter.component.scss']
})

export class ObligationsFilterComponent implements OnInit {

  filter = {};

  ngOnInit() {

  }

}
