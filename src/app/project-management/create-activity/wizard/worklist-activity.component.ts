/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProcessModel } from '../../data-types/project';

import { EmptyActivity, ProjectRef } from '../../data-types/project';

import { ProcessModelsService } from '../../services/process-models.service';

@Component({
  selector: 'worklist-activity',
  templateUrl: './worklist-activity.component.html',
  styleUrls: ['./worklist-activity.component.scss'],
  providers:[ProcessModelsService]
})

export class WorklistActivityComponent {

  @Input() public processModel: ProcessModel;

  @Input() public project: ProjectRef;

  private _onAdd = false;
  @Input()
  set onAdd(isAdd: boolean) {
    this._onAdd = isAdd;
    if (isAdd) {
      this.addProcessModel();      
    }    
  }

  @Output() public onCloseEvent = new EventEmitter();

  private activity = EmptyActivity();

  public constructor(private processModelsService: ProcessModelsService) { }

  
  private async addProcessModel() {
    const errMsg = 'Ocurrió un problema al intentar guardar.';
      
    await this.processModelsService.addProcessModel(this.project.uid,this.processModel.uid,this.activity)
                        .toPromise()
                        .then((x) => this.onCloseEvent.emit())
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
