import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';

import { ProcedureService } from '../../services/procedure.service';

@Component({
  selector: 'pv-general-info',
  templateUrl: './pv-general-info.component.html',
  styleUrls: ['./pv-general-info.component.scss'],
  providers: [ ProcedureService ]
})

export class PVGeneralInfoComponent implements OnInit {

  @ViewChild('modeler') public el: ElementRef;

  public isVisibleGeneralInfo = true;
  public isInitialTermsVisible = true;
  public isPaymentInfoVisible = true;
  public isAuthorityInfoVisible = true;

  public editionMode = false;

  public procedure: any;

  private _procedureUID: string = "";

  @Input()
  set procedureUID(procedureUID: string) {
    this._procedureUID = procedureUID;
    this.loadProcedure();
  }

  get procedureUID(): string {
    return this._procedureUID;
  }

  constructor(private procedureService: ProcedureService) { }

  ngOnInit() {

  }

  public onDisplayGeneralInfo(): void {
    this.isVisibleGeneralInfo = !this.isVisibleGeneralInfo;
  }

  public onDisplayInitialTerms(): void {
    this.isInitialTermsVisible = !this.isInitialTermsVisible;
  }

  public onDisplayPaymentInfo(): void {
    this.isPaymentInfoVisible = !this.isPaymentInfoVisible;
  }

  public onDisplayAuthorityInfo(): void {
    this.isAuthorityInfoVisible = !this.isAuthorityInfoVisible;
  }

  public openExternalWindow(url:string): void {
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

  private loadProcedure(): void {
     this.procedureService.getProcedure(this.procedureUID).then((procedure) => {
       console.log(procedure);
     this.procedure = procedure;
    });
  }

}
