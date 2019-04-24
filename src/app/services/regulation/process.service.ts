/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreService } from '@app/core/core.service';

import { Process } from '@app/models/regulation';


@Injectable()
export class ProcessService {

  constructor(private core: CoreService) { }

  getProcesses(): Promise<Process[]> {
    return this.core.http.get<Process[]>('v1/process-definitions')
                         .toPromise();
  }


  getNewProcessDiagram(): Observable<Process> {
    return this.core.http.get<Process>('v1/process-definitions/empty-process');
  }


  getProcessDiagram(uid: string): Promise<Process> {
    return this.core.http.get<Process>('v1/process-definitions/' + uid)
                         .toPromise();
  }

  saveDiagramChanges(process: Process): Promise<Process> {
    const body = {
      xml: process.xml
    };

    return this.core.http.put<Process>('v1/process-definitions/' + process.uid, body)
                         .toPromise();
  }

  saveNewDiagram(process: Process): Promise<Process> {
    const body = {
      name: process.name,
      version: process.version,
      xml: process.xml
    };

    return this.core.http.post<Process>('v1/process-definitions', body)
                         .toPromise();
  }

}
