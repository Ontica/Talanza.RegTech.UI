/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output } from '@angular/core';

import { MenuItem } from '../../models/user-interface';


@Component({
  selector: 'emp-ng-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavigationMenuComponent {

  @Input()
  get items(): MenuItem[] { return this._items; }
  set items(value: MenuItem[]) {
    if (!value) {
      return;
    }
    this._items = value;

    const selected = value.find(x => x.selected) || this.items[0];

    this.onClick(selected);

  }
  private _items: MenuItem[];


  @Output() navMenuItemClick = new EventEmitter<MenuItem>();


  onClick(menuItem: MenuItem) {
    if (!menuItem) {
      return;
    }
    this.select(menuItem);

    this.navMenuItemClick.emit(menuItem);
  }


  private select(menuItem: MenuItem) {
    if (!menuItem) {
      return;
    }
    this.items.filter(x => x.selected )
              .map(x => x.unselect());

     menuItem.select();
  }

}
