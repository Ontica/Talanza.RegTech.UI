/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component } from '@angular/core';

@Component({
  selector:'activity-selector', 
  template:
    `<div>
      <table class="form">
      <tr>
        <td class="form-title form-title-text">1) Seleccionar el tipo de actividad o evento que se desea agregar</td>
      </tr>
     </table> 
     <table class="form">
      <tr>
      <td>¿De qué tipo es el elemento que se desea agregar?</td>
      <td class="text-align-right"><select class="select-box" style="width:200px">
            <option value="">( Todas )</option>
            <option value="">Actividad</option>
          </select>
      </td>
      </tr>
     </table>
     <table class="form">
      <tr>
      <td>Buscar un tipo de actividad:</td>
      <td><select class="select-box">
            <option value="">( Todas )</option>
            <option value="">Actividad</option>
          </select>
      </td>
      </tr>
     </table>
    `,
   styleUrls:['./activity-form.scss']
 
})

export class ActivitySelectorComponent {

}