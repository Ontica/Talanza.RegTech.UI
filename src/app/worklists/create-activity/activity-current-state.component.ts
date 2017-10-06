import { Component } from '@angular/core';

@Component({
  selector:'activity-current-state',
  template:`
    <div>
    <table class="form">
    <tr>
      <td colspan="3" class="form-title form-title-text">Estado actual de esta actividad</td>
    </tr>
    <tr>
      <td>Responsable actual:</td>
      <td><b>Liliana Martinez Ruiz</b></td>
      <td class="text-align-right">No iniciada</td>
    </tr>
    <tr>
      <td>Estado actual:</td>
      <td colspan="2">Esta actividad no ha sido iniciada</td>    
    </tr>
    <tr>
      <td></td>
      <td colspan="2">No obstante, toddas las tareas y subactividades <br>
                      ya fuerón asignadas, por lo que ya es posible <br>iniciarla. </td>
    </tr>
  </table>
  </div>`,
  styleUrls:['./activity-form.scss']  

})
export class ActivityCurrentStateComponent {

}
