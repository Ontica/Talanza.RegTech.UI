import { Injectable } from '@angular/core';

import { Process } from './process';
import { PROCESSES } from './process.mock';

@Injectable()
export class ProcessDefinitionService {

  public getProcesses(): Promise<Process[]> {
    // Tobe Changed with api call to get the process list
    return Promise.resolve(PROCESSES);
  }

  public getProcessDiagram(processId: number): string {
    // Tobe Changed with api call to get diagram
    switch (processId) {
      case 20:
        return 'vendor/bpmn-js/sample-diagram.bpmn';
      case 30:
        return 'vendor/bpmn-js/complex-diagram.bpmn';
        default:
        return '';
    }

  }

}
