/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Output } from '@angular/core';

import { ProcessModel, EmptyProcessModel } from '../data-types/project'; 

import { ActivityService } from '../services/activity.service';
import { ProcessModelsService } from '../services/process-models.service'

@Component({
  selector:'activity-selector', 
  template: `      
     <table class="form">
      <tr>
      <td>¿De qué tipo es el elemento que se desea agregar?</td>
      <td class="text-align-right"><select class="select-box" style="width:200px" #elementType (change)="onChangeElementType(elementType.value)">
            <option value="">( Todas )</option>
            <option value="acitivity">Proceso</option>
            <option value="event">Evento</option>
            <option value="manual">Actividad manual</option>
          </select>
      </td>
      </tr>
     </table>  
     <table class="form" *ngIf="selectedElementType !== 'manual'">
     <tr>
       <td>Buscar un tipo <br>de actividad:</td>
       <td><select class="select-box" #activityType (change)="onChangeActivityType(activityType.value)">
           <option value="">( Todas )</option>
           <option *ngFor="let processModel of processModels" [value]="processModel.uid">
           {{processModel.name}}</option>           
         </select>
       </td>
     </tr>
   </table>  
    `,
   styleUrls:['./activity-form.scss'],
   providers:[ActivityService, ProcessModelsService]
 
})

export class ActivitySelectorComponent {
  @Output() public onSelectedElementType = new EventEmitter<string>();
  @Output() public onSelectedProcessModel= new EventEmitter<ProcessModel>();

  public processModels: ProcessModel[];

  private selectedElementType = '';
  private selectedProcessModel: ProcessModel = EmptyProcessModel();
  
  constructor(private activityService: ActivityService,
              private processModelsService: ProcessModelsService) { }

  public onChangeElementType(elementType: string): void {   
    this.selectedElementType = elementType;     
    if (elementType ==='') {      
      alert("Seleccionar de qué tipo es el elemento que se desea agregar.");
      return;
    } 

    this.loadActivityTypeCombo();
    this.onSelectedElementType.emit(elementType);    
  }

  public onChangeActivityType(uid: string): void {
    if (uid ==='') {
      alert("Seleccionar el tipo de actividad a buscar.");
      return;
    }   

    this.setSelectedProcessModel(uid);   
    this.onSelectedProcessModel.emit(this.selectedProcessModel);    
  }

  public loadActivityTypeCombo(): void {
    if (this.selectedElementType === 'event') {
      this.loadEvents();
    } else {
      this.loadProcess();
    }
  }

  public setSelectedProcessModel(uid: string): void { 
    this.selectedProcessModel = this.processModels.find((x) => x.uid === uid);    
  }

  private loadProcess(): void {
    const errMsg = 'Ocurrio un prolema al intentar leer la listas de procesos';

    this.processModelsService.getProcess()
                        .toPromise()
                        .then((x) => this.processModels = x)
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadEvents(): void {
    const errMsg = 'Ocurrio un prolema al intentar leer la listas de evntos';

    this.processModelsService.getEvents()
                        .toPromise()
                        .then((x) => this.processModels = x)
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }
  

  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }
  
}
