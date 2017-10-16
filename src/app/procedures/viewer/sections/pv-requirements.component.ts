import { Component, Input } from '@angular/core';

import { Requirement } from '../../data-types/procedure';

import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'pv-requirements',
  templateUrl: './pv-requirements.component.html',
  styleUrls: ['./pv-requirements.component.scss'],
  providers: [ProcedureService]
})

export class PVRequirementsComponent {

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

  public openExternalWindow(url:string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

  private loadProcedure(): void {
    this.procedureService.getProcedure(this.procedureUID).then((procedure) => {
      console.log(procedure);
    this.procedure = procedure;
    this.requirementList = this.procedure.requirements;
    this.conditions = this.requirementList.filter((x) => x.type === 'Condition');
    this.inputDocuments = this.requirementList.filter((x) => x.type === 'InputDocument');
    this.outputDocuments = this.requirementList.filter((x) => x.type === 'OutputDocument');
    console.log(this.inputDocuments);
   });
 }  


}