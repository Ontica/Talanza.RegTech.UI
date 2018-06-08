/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ProcessModel } from '@app/models/project-management';

import { ProcessModelsService } from '@app/services/project-management'

@Component({
  selector: 'activity-type-selector',
  templateUrl: './activity-type-selector.component.html',
  styleUrls: ['./activity-type-selector.component.scss']
})

export class ActivityTypeSelectorComponent implements OnInit {

  public processModels: ProcessModel[];
  public filteredList: ProcessModel[];
  public query = '';
  public selectedProcessModelUID = '';
  public description = '';
  public isDescriptionVisible = false;

  @Output() onSelectProcessModel = new EventEmitter<ProcessModel>();

  constructor(private processModelsService: ProcessModelsService) { }

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


    this.onSelectProcessModel.emit(processModel);
  }


  private loadEvents(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de eventos.';

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
