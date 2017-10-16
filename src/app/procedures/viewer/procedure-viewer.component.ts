import { Component, EventEmitter, HostBinding,
         Input, Output } from '@angular/core';

import { ProcedureService } from '../services/procedure.service';

@Component({
  selector:'procedure-viewer',
  templateUrl: './procedure-viewer.component.html',
  styleUrls: ['./procedure-viewer.component.scss'],
  providers: [ProcedureService]
})

export class ProcedureViewerComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  private _procedureUID: string = '';
  @Input()
  set procedureUID(procedureUID: string) {
    this._procedureUID = procedureUID;
    this.loadProcedure();
  }
  get procedureUID(): string {
    return this._procedureUID;
  }

  @Output() public onCloseEvent = new EventEmitter();

  public selectedTask: string = 'generalInfo'; 
  public procedure: any;

  public constructor(private procedureService: ProcedureService) { }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;  
  }

  public onCloseTaskEditor(): void {
    this.onClose();
  }

  private loadProcedure(): void {
    const errMsg = 'Ocurrió un problema al intentar guardar.';
    
    this.procedureService.getProcedure(this.procedureUID)
                         .then((procedure) => this.procedure = procedure)
                         .catch((e) => this.exceptionHandler(e,errMsg));
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
