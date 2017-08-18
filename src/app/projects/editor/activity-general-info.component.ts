import { Component } from '@angular/core';

@Component({
  selector:'activity-general-info',
  template:` <table class="form">
             <tr>
                <td class="form-title form-title-text">1) Tipo de actividad</td>
              </tr>              
            </table>
            <table class="form">
              <tr>
              <td>Actividad:</td>
              <td>Modificación de Medidores <br> en plataformas petroleras</td>
              <td class="text-align-right">Tipo:Bloque de actividades</td>              
              </tr>
            </table>
            <activity-description></activity-description>
            <table class="form">
             <tr>
                <td class="form-title form-title-text">2) Información de la actividad</td>
              </tr>
            </table>
            <activity-info  [project]="project" [parentId]="parentId" [activityId]="activityId" (onCloseEvent)="onClose()"></activity-info>
            <div class="form-footer border-top">
              <table class="form">
                <tr>
                  <td class="text-align-right ">
                    <button class="btn " (click)="onClickCancel()">Cancelar</button>
                  </td>
                  <td class="text-align-right ">
                    <button class="btn " (click)="onClickAddActivity()">Guardar los cambios</button>
                  </td>
                </tr>
              </table>
            </div>`,
  styleUrls:['./activity-form.scss'],

})
export class ActivityGeneralInfoComponent {

}