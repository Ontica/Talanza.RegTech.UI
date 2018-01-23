/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, OnInit, Output }  from '@angular/core';

import { ProcessModel, EmptyProcessModel } from '../../data-types/project'; 

import { ProcessModelsService } from '../../services/process-models.service'

@Component({
  selector:'select-type-activity',
  templateUrl: './select-type-activity.component.html',
  styleUrls: ['./select-type-activity.component.scss'],
  providers:[ProcessModelsService]
})

export class SelectTypeActivityComponet implements OnInit {

  public processModels: ProcessModel[];
  public filteredList: ProcessModel[];
  public query = '';
  public selectedProcessModelUID = '';
  public description = '';
  public isDescriptionVisible = false;

  @Output() onSelectProcessModel = new EventEmitter<ProcessModel>();

  constructor (private processModelsService: ProcessModelsService){}

  ngOnInit() {
    this.loadEvents();
  }

  public filter(): void {
    if (this.query !== "") {
      this.filteredList = this.processModels.filter(function (el) {
        return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
     
    } else {
      this.filteredList = [];
    }
  }
  
  public setAllEvents(): void {
    this.loadEvents();
    this.filteredList = this.processModels;
  }

  public onSelectEvent(processModel: ProcessModel): void {
    this.selectedProcessModelUID = processModel.uid;
    
    console.log(processModel);
    this.onSelectProcessModel.emit(processModel);
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