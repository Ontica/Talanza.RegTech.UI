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
  selector:'activity-worklist',
  template:`
      <table class="grid">
        <thead>
          <tr>
            <th style="width:5%">#</th>
            <th style="width:60%">Lista de tareas y subactividades asociadas</th>
            <th style="width:35%">Autoridad</th>           
          </tr>
        </thead>
        <tbody>        
          <tr *ngFor="let step of  processModel.steps">
            <td style="width:5%">{{step.stepNo}}</td>
            <td style="width:60%"><a>{{step.name}}</a></td>
            <td style="width:35%">{{step.involvedParty}}</td>            
          </tr>          
        </tbody>
      </table>            
            `,
  styleUrls:['./activity-worklist.component.scss'],

})
export class ActivityWorklistComponent {

  @Input() public processModel: ProcessModel;

}
