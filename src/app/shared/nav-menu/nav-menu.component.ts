/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter,
         Input, Output } from '@angular/core';


export class MenuItem {

  readonly action: string = '';
  readonly text: string = '';
  private _disabled: boolean = false;
  private _selected: boolean = false;

  constructor(text: string, action?: string, disabled?: boolean) {
    this.text = text;
    this.action = action || text;
    this._disabled = disabled || false;
  }


  get disabled(): boolean {
    return this._disabled;
  }


  get enabled(): boolean {
    return !this._disabled;
  }


  get selected(): boolean {
    return this._selected;
  }

  enable() {
    this._disabled = false;
  }

  disable() {
    this._disabled = true;
  }

  select() {
    this._selected = true;
  }

  unselect() {
    this._selected = false;
  }

}


@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavigationMenuComponent {

  @Output() click = new EventEmitter<MenuItem>();

  @Input() layoutType: string;

  @Input()
  get items(): MenuItem[] { return this._items };
  set items(value: MenuItem[]) {
    this._items = value;

    const selected = value.find(x => x.selected) || this.items[0];

    this.onClick(selected);

  };
  private _items: MenuItem[];

  constructor() { }


  onClick(menuItem: MenuItem) {
    this.select(menuItem);

    this.click.emit(menuItem);
  }

  private select(menuItem: MenuItem) {
    this.items.filter(x => x.selected )
              .map(x => x.unselect());

     menuItem.select();
  }

}
