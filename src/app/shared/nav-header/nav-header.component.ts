/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output, OnInit } from '@angular/core';

import { MenuItem } from '../nav-menu/nav-menu.component';


@Component({
  selector: 'navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit {

  title = 'Salina Area 28';

  breadcrumb = 'Proyecto regulatorio Shell Ronda 2.4';

  @Output() action = new EventEmitter<string>();

  @Input() layoutType: string;

  @Input() mainMenuItems: MenuItem[];

  @Input() secondaryMenuItems: MenuItem[];

  constructor() { }

  ngOnInit() {

  }

  onClickMenu(menuItem: MenuItem) {
    this.action.emit(menuItem.action);
  }

}
