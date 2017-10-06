import { Component } from '@angular/core';

@Component({
  selector:'activity-next-state',
  template:`
    <div>
    <table class="form">
    <tr>
      <td colspan="2" class="form-title form-title-text">Siguinte estado</td>
    </tr>
    <tr>
      <td>Descripción:</td>
      <td>Al inicar la activdad se asignan las tarea a cada uno de los responsable<br>
          y comenzara a administrarse de tiempos reales.<br>
          <br>
          Una actividad ya iniciada puede suspenderse y luego continuar nuevamente.
      </td>
    </tr>   
    <tr>
      <td></td>
      <td class="text-align-right"><button class="btn">Iniciar esta actividad</button></td>
    </tr>
  </table>
  </div>`,
  styleUrls:['./activity-form.scss']

})
export class ActivityNextStateComponent {

}