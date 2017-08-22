/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component } from '@angular/core';

@Component({
  selector:'task-history',
  template:` 
        <table class="grid">
        <thead>
          <tr>           
            <th style="width:15%">Movimiento</th>
            <th style="width:10%">Responsable</th>           
            <th style="width:12%">Recibida</th>           
            <th style="width:12%">Terminada</th>           
            <th style="width:12%">Entregada</th>           
            <th style="width:10%">Tiempo</th> 
            <th style="width:10%">Estado</th> 
           <th style="width:18%">Observaciones</th> 
          </tr>
        </thead>
        <tbody>        
          <tr>
            <td style="width:15%">Calificación</td>
            <td style="width:10%">Francisco L.</td>
            <td style="width:12%">9/Jul/17 12:50</td>            
            <td style="width:12%">10/Jul/17 8:30</td>            
            <td style="width:12%">10/Jul/17 8:45</td>            
            <td style="width:10%">16:45 horas</td>            
            <td style="width:10%">Terminado</td>            
            <td style="width:18%"></td> 
          </tr> 
         <tr>
            <td style="width:15%">Elaboración</td>
            <td style="width:10%">José Luis L.</td>
            <td style="width:12%">10/Jul/17 8:45</td>            
            <td style="width:12%">14/Jul/17 17:11</td>            
            <td style="width:12%">14/Jul/17 17:12</td>            
            <td style="width:10%">5.89 días</td>            
            <td style="width:10%">Terminado</td>            
            <td style="width:18%">Favor de revisar.</td>              
          </tr>
        <tr>
            <td style="width:15%">Elaboración</td>
            <td style="width:10%">Lianan M.</td>
            <td style="width:12%">14/Jul/17 17:12</td>            
            <td style="width:12%"></td>            
            <td style="width:12%"></td>            
            <td style="width:10%">14.86 días</td>            
            <td style="width:10%">Pendiente</td>            
            <td style="width:18%"></td>           
          </tr>
        </tbody>
      </table>            
            `,
  styleUrls:['./task-history.component.scss'],

})
export class TaskHistoryComponent {
  
}