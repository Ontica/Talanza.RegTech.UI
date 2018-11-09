/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

interface config { uid: string, name: string }

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.control.html',
  styleUrls: ['./dropdown-menu.control.scss']
})

export class DropdownMenuControl {

  public dropdownMenuItemsVisible = true;

  private _items: config[] = [];
  @Input()
  set items(items: config[]) {
    this._items = items;
  }
  get items(): config[] {
    return this._items;
  }

  @Output() selectedItem = new EventEmitter<string>();

  public selectItem(item: config): void {
    this.selectedItem.emit(item.uid);

    this.dropdownMenuItemsVisible = false;
  }

}
