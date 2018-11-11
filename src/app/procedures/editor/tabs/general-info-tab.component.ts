/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit } from '@angular/core';

import { Entity, Office, Position, Procedure } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-general-info-tab',
  templateUrl: './general-info-tab.component.html',
  styleUrls: ['./general-info-tab.component.scss']
})
export class GeneralInfoTabComponent implements OnInit {

  @Input() procedure: Procedure;

  addButtonLabel = '';
  offices: Office[] = [];
  entities: Entity[] = [];
  positions: Position[] = [];
  isNewProcedure = false;
  disabled = true;

  ngOnInit() {

  }

}
