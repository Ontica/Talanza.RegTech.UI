import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { Process } from './process';
import { PROCESSES } from './process.mock';

@Injectable()
export class ProcessDefinitionService {

  public constructor(private core: CoreService) { }

  private get HTTP_API_BASE_ADDRESS() {
    return this.core.appSettings.get<string>('HTTP_API_BASE_ADDRESS');
  }

  public getProcesses(): Promise<Process[]> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    return httpApiClient.getAsyncAsPromise('/v1/process-definitions');
  }

  public getProcessDiagram(uid: string): Promise<Process> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    return httpApiClient.getAsyncAsPromise('/v1/process-definitions/' + uid);
  }

  public saveDiagramChanges(process: Process) {
    const body = {
      bpmnXml: process.bpmnXml
    };

    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    httpApiClient.IncludeAuthorizationHeader = false;

    httpApiClient.PutAsync(body, 'v1/process-definitions/' + process.uid);
  }

  public saveNewDiagram(process: Process) {
    const body = {
      name: process.name,
      version: process.version,
      bpmnXml: process.bpmnXml
    };

    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    httpApiClient.IncludeAuthorizationHeader = false;

    httpApiClient.postAsync(body, 'v1/process-definitions');
  }

}
