/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ElementRef } from '@angular/core';


@Component({
  selector: 'global-add',
  host: {
    '(document:click)': 'handleClick($event)'
  },
  templateUrl: './global-add.component.html',
  styleUrls: ['./global-add.component.scss']
})
export class GlobalAddComponent {

  isHideControl = false;
  selectedItem: string;
  elementRef: any;

  items: string[] = ['FAQ', 'Reunión'];

  selectedUID: string;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  onClick(): void {
    this.isHideControl = !this.isHideControl;
  }

  onSelectItem(item: any): void {
    this.selectedItem = item;


    this.isHideControl = !this.isHideControl;
  }

  handleClick(event): void {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.isHideControl = false;
    }
  }

  private setSelectedItem(item: string): void {
    this.selectedItem = item;
  }

}
