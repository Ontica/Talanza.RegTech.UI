/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, Input } from '@angular/core';

import { ProcessModel } from '../data-types/project';

@Component({
  selector:'activity-description', 
  template:
    `<div>     
     <table class="form">
      <tr>
      <td>Descripción: {{processModel.notes}}.</td>   
      </tr>
      <tr>
        <table>
          <tr>
            <td *ngFor="let link of processModel.links"><a (click)="openPage(link.url)">{{link.name}}</a></td>
          </tr>
        </table>
      </tr>
     </table>
     </div>
    `,
   styleUrls:['./activity-form.scss']
 
})

export class ActivityDescriptionComponent {
  @Input() public processModel: ProcessModel;

  public openPage(url:string): void {
    alert(url);
  }
}