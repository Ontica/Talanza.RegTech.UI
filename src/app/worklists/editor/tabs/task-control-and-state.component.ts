import { Component } from '@angular/core';

@Component({
  selector:'task-control-and-state',
  template:`
          <table class="form">
            <tr>
              <td colspan="3" class="form-title form-title-text">Estado actual de esta tarea</td>
            </tr>
            <tr>
              <td>Asignado a:</td>
              <td><b>Liliana Martinez Ruiz</b></td>            
            </tr>
            <tr>
              <td>Entregables:</td>
              <td>Todos los entregabales están marcados como entregados.</td>    
            </tr>  
          </table>
          <table class="form">
            <tr>
              <td>Descripción:</td>
              <td colspan="3"><b>890 -Elaborar documento plan mínimo de trabajo. </b></td>
            </tr>
            <tr>
              <td>Asignado el:</td>
              <td><b>5 de Agosto 2017 15:36</b></td>
              <td>Asignado por:</td>
              <td><b>Heriberto Murrieta López</b></td>
            </tr>
            <tr>
              <td>Origen:</td>
              <td colspan="3"><b>Actividad 569 del Proyecto ABC (Sierra1.4 Area Contractual 07)</b></td>
            </tr>
          </table>
      
          <table class="form">
            <tr>
              <td colspan="2" class="form-title form-title-text">Siguinte estado</td>
            </tr>
            <tr>
              <td>Elegir el siguiente estado de la tarea:</td>
              <td class="text-align-right">Enviar a revisión</td> 
            </tr>   
            <tr>
              <td>Esta tarea se enviará a revisión a:</td>
              <td><select class="select-box">        
                  <option value="vero">Veronica Macias</option>
                  <option value="chris">Christian Yáñez Pérez</option>
                </select>
              </td> 
            </tr>
            <tr>
              <td>¿Le enviamos alguna observación?</td>
              <td><textarea class="text-area" rows="5" cols="25"></textarea></td>
            </tr>
            <tr>
              <td></td>
              <td class="text-align-right"><button class="btn">Iniciar esta actividad</button></td>
            </tr>
          </table>`,
  styleUrls:['./task-form.scss'],

})
export class TaskControlAndStateComponent {

}