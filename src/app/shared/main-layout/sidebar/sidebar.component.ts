/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input } from '@angular/core';

import { ProjectStore } from '@app/store/project.store';


@Component({
  selector: 'emp-ng-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() layoutType: string;

  constructor(public projectStore: ProjectStore) {}

}
