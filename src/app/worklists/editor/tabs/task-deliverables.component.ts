import { Component } from '@angular/core';

@Component({
  selector:'task-deliverables',
  template:`        
        <table class="form">
          <tr>
            <td colspan="2" class="form-title form-title-text">Entregable 1 de 2</td>
          </tr>
          <tr>
            <td>Descripción:<b>formato con la ficha técnica del programa,<br>
             mínimo de trabajo</b> </td>
            <td class="text-align-right">En revisión</td>            
          </tr>
          <tr>
            <td>Tipo: <b>Documento de Word</b></td>
            <td> <a>Formato</a> <a>Instrucciones</a> <a>Ejemplo</a></td>    
          </tr>            
        </table>
        <table class="form">
          <tr>
            <td colspan="2" class="form-title form-title-text">Entregable 2 de 2</td>
          </tr>
          <tr>
            <td>Descripción:<b>Presupuesto inicial del program mínimo,<br>
            de acuerdo a lo estipulado por la Norma NOM-546</b> </td>
            <td class="text-align-right">No anexado</td>            
          </tr>
          <tr>
            <td>Tipo: <b>Liga web a documento PDF</b></td>
            <td> <a>Formato</a> <a>Instrucciones</a> <a>Ejemplo</a></td>    
          </tr>            
        </table>    
  `,
  styleUrls:['./task-form.scss'],

})
export class TaskDeliverablesComponent {

}