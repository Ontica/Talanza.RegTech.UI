/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector:'activity-search-by-type', 
  template: `
          <table class="form">
            <tr>
              <td>Buscar un tipo <br>de actividad:</td>
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

export class ActivitySearchByTypeComponent {
  @Input() public elementType = '';
  @Output() public sarchResult =  new EventEmitter<string>();
  
  private searchActivityType(): void {

  }



  
}