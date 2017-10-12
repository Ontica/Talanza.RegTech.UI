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
  selector: 'activity-description',
  template:
    `<div>
      <table class="form">
        <tr>
          <td>Descripción:</td>
          <td style="width:420px;white-space:normal">
            {{processModel.notes}}
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>
            <table>
              <tr>
                <td style="white-space:normal">
                  <span *ngFor="let link of processModel.links">
                    <u><b><a (click)="openExternalWindow(link.url)">{{link.name}}</a></b></u>
                    &nbsp; &nbsp; &nbsp;
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
     </div>
    `,
   styleUrls:['./activity-form.scss']
})

export class ActivityDescriptionComponent {
  @Input() public processModel: ProcessModel;

  public openExternalWindow(url:string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }
}
