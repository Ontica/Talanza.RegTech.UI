/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector:'activity-selector', 
  template: `      
     <table class="form">
      <tr>
      <td>¿De qué tipo es el elemento que se desea agregar?</td>
      <td class="text-align-right"><select class="select-box" style="width:200px" #activityType (change)="onChageActivityType(activityType.value)">
            <option value="">( Todas )</option>
            <option value="acitivity">Actividad</option>
            <option value="event">Evento</option>
          </select>
      </td>
      </tr>
     </table>    
    `,
   styleUrls:['./activity-form.scss']
 
})

export class ActivitySelectorComponent {
  @Output() public onSelectActivityType = new EventEmitter<string>();

  public onChageActivityType(activityType: string): void {
    if(activityType ==='') {
      alert("Seleccionar de qué tipo es el elemento que se desea agregar.");
      return;
    }
    this.onSelectActivityType.emit(activityType);    
  }
  
}