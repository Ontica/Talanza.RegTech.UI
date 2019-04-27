/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View } from './user-interface';


export class MenuItem {

  readonly action: string = '';

  readonly text: string = '';

  readonly routerLink: string = '';

  private _disabled = false;

  private _selected = false;


  constructor(text: string, action: string = '', routerLink: string = '', disabled: boolean = false) {
    this.text = text;
    this.action = action;
    this.routerLink = routerLink;
    this._disabled = disabled;
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


export function createMenuItemForView(view: View): MenuItem {
  return new MenuItem(view.menuTitle || view.title, undefined, view.url, view.disabled);
}
