/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, Input } from '@angular/core';

import { ProcessModel } from '../../data-types/project';

@Component({
  selector: 'worklist-activity',
  templateUrl: './worklist-activity.component.html',
  styleUrls: ['./worklist-activity.component.scss']
})

export class WorklistActivityComponent {
  @Input() public processModel: ProcessModel;
  
}