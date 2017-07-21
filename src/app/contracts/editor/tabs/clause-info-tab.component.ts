/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input } from '@angular/core';

import { Clause } from '../../data-types/clause';

@Component({
  selector: 'clause-info-tab',
  templateUrl: './clause-info-tab.component.html',
  styleUrls: ['./clause-info-tab.component.scss'],

})

export class ClauseInfoTabComponent {
  @Input() public clause: Clause;

}
