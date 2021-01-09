/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Input } from '@angular/core';

import { Command, EventInfo } from '@app/core/data-types';

import { ProcessService } from '@app/data-services/regulation';

import { ProjectModel } from '@app/store/project.store';


@Component({
  selector: 'emp-ng-process-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['../../../../../styles/card.scss']
})
export class ProcessDiagramEditorComponent implements OnInit {

  xml: string;

  modelerAction: Command;

  @Input() project: ProjectModel;

  constructor(private processsService: ProcessService) { }

  ngOnInit() {
    this.processsService.getNewProcessDiagram()
                        .toPromise()
                        .then(x => this.xml = x.xml);
  }

  onModelerError(err: any) {
    console.log('Modeler error', err);
  }

  onModelerEvent(event: EventInfo) {
    console.log('Modeler event', event);
  }

  onSave() {
    this.modelerAction = {
      type: 'save'
    };
  }

}
