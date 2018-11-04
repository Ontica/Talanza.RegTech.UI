/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit } from '@angular/core';

import { Procedure } from "@app/models/regulation";


@Component({
  selector: 'requirements-tab',
  templateUrl: './requirements-tab.component.html',
  styleUrls: ['./requirements-tab.component.scss']
})
export class RequirementsTabComponent implements OnInit {

  @Input() procedure: Procedure;

  addButtonLabel = '';
  disabled = true;

  ngOnInit() {

  }

}
