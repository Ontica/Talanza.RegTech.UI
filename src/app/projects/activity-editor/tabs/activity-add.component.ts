/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, HostBinding, Output} from '@angular/core';

@Component({
  selector:'activity-add', 
  template:
    ` <div class="editor-container editor-container-style">
             <div class="header">
              <div class="close-button right-position" (click)="onClose()">&times;</div>
              <div class="title">Agregar actividad al proyecto: <b>R1-4(El dorado)/Sierra oil</b></div>
            </div>
          <div>
            <table class="form">
              <tr>
                <td class="form-title form-title-text">1) Seleccionar el tipo de actividad o evento que se desea agregar</td>
              </tr>
            </table> 
            <activity-selector></activity-selector>
            <activity-search-by-type></activity-search-by-type>
          </div>
          
          <div class="form-frame"> 
            <div>
              <table class="form">
                <tr>
                  <td class="form-title form-title-text">2) Información sobre el evento seleccionado</td>
                </tr>
              </table> 
              <activity-description></activity-description>     
            </div>
            <div>
              <table class="form">
                <tr>
                  <td class="form-title form-title-text">3) Lista de tareas y subactividades asociadas</td>
                </tr>
              </table> 
              <activity-worklist></activity-worklist>   
            </div>
            <div>
              <table class="form">
                <tr *ngIf="!isEvent">
                  <td class="form-title form-title-text">4) Información de la actividad </td>
                </tr>
                <tr *ngIf="isEvent">
                  <td class="form-title form-title-text">4) Información del evento </td>
                </tr>
              </table> 
              <activity-info  [project]="project" [parentId]="parentId" [activityId]="activityId" (onCloseEvent)="onClose()"></activity-info>
            </div>                              
                     
          
      </div>
      </div>  
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
            </div> 
    `,
   styleUrls:['./activity-windowmodal.scss','./activity-form.scss']
 
})

export class ActivityAddComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();

  public isEvent = false;

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {
    this.onClose();
  }
}