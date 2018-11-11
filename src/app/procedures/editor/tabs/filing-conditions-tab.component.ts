/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit } from '@angular/core';

import { Procedure } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-filing-conditions-tab',
  templateUrl: './filing-conditions-tab.component.html',
  styleUrls: ['./filing-conditions-tab.component.scss']
})
export class FilingConditionsTabComponent implements OnInit {

  @Input() procedure: Procedure;

  addButtonLabel = '';
  disabled = true;

  ngOnInit() {

  }

}
