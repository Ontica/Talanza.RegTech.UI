/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PresentationLayer } from '@app/core/presentation';
import { MainUIStateSelector } from '@app/core/presentation/presentation-types';


@Component({
  selector: 'emp-ng-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  reportingTools: Observable<boolean> = of(false);

  constructor(uiLayer: PresentationLayer) {
    this.reportingTools = uiLayer.select<boolean>(MainUIStateSelector.REPORTING_TOOLS);
  }

}
