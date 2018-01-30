/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input } from '@angular/core';

@Component({
    selector:'container',
    template:`
      <div class="container-title">{{title}}
        <div class="cotainer-title-icons">
          <i class="fa fa-expand" aria-hidden="true"></i>
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
      <div class="container-body">
        <ng-content></ng-content>
      </div>   
     `,
    styleUrls: ['./container.component.scss']    
})

export class ContainerComponent {

  @Input() title: string = "";  

}
