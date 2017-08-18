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
      <td class="text-align-right"><select class="select-box" style="width:200px" #elementType (change)="onChangeElementType(elementType.value)">
            <option value="">( Todas )</option>
            <option value="acitivity">Proceso</option>
            <option value="event">Evento</option>
            <option value="manual">Actividad manual</option>
          </select>
      </td>
      </tr>
     </table>  
     <table class="form" *ngIf="selectedElementType !== 'manual'">
     <tr>
       <td>Buscar un tipo <br>de actividad:</td>
       <td><select class="select-box" #activityType (change)="onChangeActivityType(activityType.value)">
           <option value="">( Todas )</option>
           <option value="medidor">Modificación de medidores</option>
           <option value="extractor">Instalación de extractor de gas</option>
         </select>
       </td>
     </tr>
   </table>  
    `,
   styleUrls:['./activity-form.scss']
 
})

export class ActivitySelectorComponent {
  @Output() public onSelectElementType = new EventEmitter<string>();
  @Output() public onSelectActivityType = new EventEmitter<string>();

  public selectedElementType = '';

  public onChangeElementType(elementType: string): void {   
    this.selectedElementType = elementType;     
    if(elementType ==='') {      
      alert("Seleccionar de qué tipo es el elemento que se desea agregar.");
      return;
    }    
    this.onSelectElementType.emit(elementType);    
  }

  public onChangeActivityType(activityType: string): void {
    if(activityType ==='') {
      alert("Seleccionar el tipo de actividad a buscar.");
      return;
    }   
    this.onSelectActivityType.emit(activityType);    
  }
  
}