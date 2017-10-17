import { Component, Input } from '@angular/core';

import { Requirement } from '../../data-types/procedure';

import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'pe-requirements',
  templateUrl: './pe-requirements.component.html',
  styleUrls: ['./pe-requirements.component.scss'],
  providers: [ProcedureService]
})

export class PERequirementsComponent {

  public procedure: any;
  public conditions: Requirement[] = [];
  public inputDocuments: Requirement[] = [];
  public outputDocuments: Requirement[] = [];

  private _procedureUID: string = '';
  @Input() 
  set procedureUID(procedureUID: string) {
    this._procedureUID = procedureUID;
    this.loadRequirements();
  }
  get procedureUID(): string {
    return this._procedureUID;
  }

  constructor(private procedureService: ProcedureService) { }

  private async loadRequirements(){
    await this.loadProcedure();
    this.loadConditions();
    this.loadInputDocuments();
    this.loadOutputDocuments();
   }

  public openExternalWindow(url:string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

  private async loadProcedure() {
    await this.procedureService.getProcedure(this.procedureUID).then((procedure) => {     
      this.procedure = procedure;          
    });
  }
  
  private loadConditions(): void {
    this.conditions =  this.procedure.requirements.filter((x) => x.type === 'Condition');
  }

  private loadInputDocuments(): void {
    this.inputDocuments =  this.procedure.requirements.filter((x) => x.type === 'InputDocument');
  }

  private loadOutputDocuments(): void {
    this.outputDocuments =  this.procedure.requirements.filter((x) => x.type === 'OutputDocument');  
  } 
  
  private onAttach(): void {
    const msg = "Por el momento no es posible adjuntar archivos.";                

    alert(msg);
  }

  private onAssign(): void {
    const msg = "Por el momento no es posible asignar tareas";                
    
    alert(msg);
  }

}
