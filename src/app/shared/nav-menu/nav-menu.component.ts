/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output } from '@angular/core';


export class MenuItem {

  readonly uid: string = '';
  readonly text: string = '';
  readonly enabled: boolean = true;

  constructor(text: string, uid?: string, enabled?: boolean) {
    this.text = text;
    this.uid = uid || text;
    this.enabled = enabled || true;
  }

}


@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavigationMenuComponent {

  @Output() select = new EventEmitter<MenuItem>();

  @Input() items: MenuItem;

  selectedItem: MenuItem;


  constructor() { }


  onSelectMenuItem(menuItem: MenuItem) {
     this.selectedItem = menuItem;

     this.select.emit(menuItem);
  }

}
