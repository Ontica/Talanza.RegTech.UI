import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { Process } from '../data-types/process';

@Injectable()
export class ProcessService {

  public constructor(private core: CoreService) { }

  public getProcesses(): Promise<Process[]> {
    return this.core.http.get<Process[]>('v1/process-definitions')
                         .toPromise();
  }

  public getProcessDiagram(uid: string): Promise<Process> {
    return this.core.http.get<Process>('v1/process-definitions/' + uid)
                         .toPromise();
  }

  public saveDiagramChanges(process: Process): Promise<Process> {
    const body = {
      bpmnXml: process.bpmnXml
    };

    return this.core.http.put<Process>('v1/process-definitions/' + process.uid, body)
                         .toPromise();
  }

  public saveNewDiagram(process: Process): Promise<Process> {
    const body = {
      name: process.name,
      version: process.version,
      bpmnXml: process.bpmnXml
    };

    return this.core.http.post<Process>('v1/process-definitions', body)
                         .toPromise();
  }

}
