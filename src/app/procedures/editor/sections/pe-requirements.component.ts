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
  public requirementList: Requirement[] = [];
  public conditions: Requirement[] = [];
  public inputDocuments: Requirement[] = [];
  public outputDocuments: Requirement[] = [];

  private _procedureUID: string = '';
  @Input() 
  set procedureUID(procedureUID: string) {
    this._procedureUID = procedureUID;
    this.loadProcedure();
  }
  get procedureUID(): string {
    return this._procedureUID;
  }

  constructor(private procedureService: ProcedureService) { }

  private loadProcedure(): void {
    this.procedureService.getProcedure(this.procedureUID).then((procedure) => {      
    this.procedure = procedure;
    this.requirementList = this.procedure.requirements;
    this.conditions = this.requirementList.filter((x) => x.type === 'Condition');
    this.inputDocuments = this.requirementList.filter((x) => x.type === 'InputDocument');
    this.outputDocuments = this.requirementList.filter((x) => x.type === 'OutputDocument');    
   });
 }  

}
