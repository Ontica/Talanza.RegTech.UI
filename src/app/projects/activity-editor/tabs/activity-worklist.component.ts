import { Component } from '@angular/core';

@Component({
  selector:'activity-worklist',
  template:`
        <table class="form grid">
        <thead>
          <tr>
            <th style="width:5%">#</th>
            <th style="width:60%">Lista de tareas y subactividades asociadas</th>
            <th style="width:35%">Autoridad</th>           
          </tr>
        </thead>
        <tbody>
         <!-- <tr *ngFor="let task of taksList; let i = index;">-->
          <tr>
            <td style="width:5%">1</td>
            <td style="width:60%"><a>Desarrollo del plan de trabajo</a></td>
            <td style="width:35%"></td>            
          </tr>
          <tr>
            <td style="width:5%">2</td>
            <td style="width:60%"><a>Solicitud de cambio de medidor</a></td>
            <td style="width:35%">CNH</td>            
          </tr>
          <tr>
            <td style="width:5%">2.1</td>
            <td style="width:60%"><a>Prperar documento para cambio de medidor</a></td>
            <td style="width:35%"></td>            
          </tr>
           <tr>
            <td style="width:5%">2.2</td>
            <td style="width:60%"><a>Enviar solicitud de cambio de medidor</a></td>
            <td style="width:35%"></td>            
          </tr>
           <tr>
            <td style="width:5%">3</td>
            <td style="width:60%">Esperar respuesta de la autoridad</td>
            <td style="width:35%">CNH</td>            
          </tr>
           <tr>
            <td style="width:5%">4</td>
            <td style="width:60%"><a>Efectuar el cambio de medidores</a><td></td>
            <td style="width:35%"></td>            
          </tr>
           <tr>
            <td style="width:5%"><5></td>
            <td style="width:60%"><a>aviso de cambio de medidor</a></td>
            <td style="width:35%">SENER</td>            
          </tr>           
        </tbody>
      </table>            
            `,
  styleUrls:['./activity-grid.scss'],

})
export class ActivityWorklistComponent {
  
}