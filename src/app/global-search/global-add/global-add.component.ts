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

  public isHideControl = false;
  public selectedItem: string;
  public elementRef: any;

  public items: string[] = ['FAQ', 'Reunión'];

  public selectedUID: string;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  public onClick(): void {
    this.isHideControl = !this.isHideControl;
  }

  public onSelectItem(item: any): void {
    this.selectedItem = item;


    this.isHideControl = !this.isHideControl;
  }

  public handleClick(event): void {
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
