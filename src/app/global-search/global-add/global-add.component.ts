/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ElementRef } from '@angular/core';


@Component({
  selector: 'emp-kb-global-add',
  templateUrl: './global-add.component.html',
  styleUrls: ['./global-add.component.scss']
})
export class GlobalAddComponent {

  visible = false;
  selectedItem: string;
  elementRef: any;

  items: string[] = ['FAQ', 'Reunión'];

  selectedUID: string;


  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }


  onClick(): void {
    this.visible = true;
  }


  onSelectItem(item: string): void {
    this.selectedItem = item;

    this.visible = false;
  }

}
