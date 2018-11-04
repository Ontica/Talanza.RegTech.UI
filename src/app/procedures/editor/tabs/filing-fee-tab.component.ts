/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit } from '@angular/core';

import { Procedure } from "@app/models/regulation";


@Component({
  selector: 'filing-fee-tab',
  templateUrl: './filing-fee-tab.component.html',
  styleUrls: ['./filing-fee-tab.component.scss'],
})
export class FilingFeeTabComponent implements OnInit {

  @Input() procedure: Procedure;

  addButtonLabel = '';
  isFree = false;
  disabled = true;
  isDisabled = true;

  ngOnInit() {

  }

}
