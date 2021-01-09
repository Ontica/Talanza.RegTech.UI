/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserInterfaceStore } from '@app/views/main-layout/ui.store';


@Component({
  selector: 'emp-ng-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  reportingTools: Observable<boolean> = of(false);

  constructor(uistore: UserInterfaceStore) {
    this.reportingTools = uistore.reportingTools;
  }

}
