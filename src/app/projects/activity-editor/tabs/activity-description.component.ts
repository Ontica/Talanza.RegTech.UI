/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component } from '@angular/core';

@Component({
  selector:'activity-description', 
  template:
    `<div>     
     <table class="form">
      <tr>
      <td>Descripción: La modificación de medidores aplica en aquellos casos donde se presume la existencia de fallas.
           <br><br>
           <p><a> Ficha técnica</a> <a>Diagrama de procesos</a> <a>Página web CNH</a></p>
      </td>   
      </tr>
     </table>
     </div>
    `,
   styleUrls:['./activity-form.scss']
 
})

export class ActivityDescriptionComponent {

}