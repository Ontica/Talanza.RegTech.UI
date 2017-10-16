import { Component, EventEmitter, HostBinding,
         Input, Output } from '@angular/core';

@Component({
  selector:'procedure-viewer',
  templateUrl: './procedure-viewer.component.html',
  styleUrls: ['./procedure-viewer.component.scss']
})

export class ProcedureViewerComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  private _procedureUID: string = '';
  @Input()
  set procedureUID(procedureUID: string) {
    this._procedureUID = procedureUID;
  }
  get procedureUID(): string {
    return this._procedureUID;
  }

  @Output() public onCloseEvent = new EventEmitter();

  public selectedTask: string = 'generalInfo'; 

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public setSelectedTask(selectedTask: string): void {
    this.selectedTask = selectedTask;  
  }

  public onCloseTaskEditor(): void {
    this.onClose();
  }

}
