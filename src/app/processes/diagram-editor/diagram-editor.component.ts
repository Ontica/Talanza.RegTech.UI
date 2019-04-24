/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Action, createAction, EventData } from '@app/models/core';

import { ProcessService } from '@app/services/regulation';

import { ProjectModel } from '@app/store/project.store';



@Component({
  selector: 'emp-ng-process-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.scss']
})
export class ProcessDiagramEditorComponent implements OnInit, OnChanges {

  xml: string;

  modelerAction: Action;

  @Input() project: ProjectModel;

  constructor(private processsService: ProcessService) { }

  ngOnInit() {
    this.processsService.getNewProcessDiagram()
                        .toPromise()
                        .then(x => this.xml = x.xml);
  }

  ngOnChanges() {

  }


  onModelerError(err: any) {
    console.log('Modeler error', err);
  }


  onModelerEvent(event: EventData) {
    console.log('Modeler event', event);
  }


  onSave() {
    this.modelerAction = createAction('save');
  }

}
