
import {
  ChangeDetectorRef, Component, ElementRef,
  Input, Pipe, PipeTransform, Renderer2, ViewChild, OnInit
} from '@angular/core';

import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { ProcedureService } from '../../services/procedure.service';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector:'pv-general-info',
  templateUrl:'./pv-general-info.component.html',
  styleUrls:['./pv-general-info.component.scss'],
  providers:[ ProcedureService]
})

export class PVGeneralInfoComponent implements OnInit{
  
  @ViewChild('modeler') public el: ElementRef;

  public isVisibleGeneralInfo = true;
  public isInitialTermsVisible = true;
  public isPaymentInfoVisible = true;
  public isAuthorityInfoVisible = true;

  public url: SafeResourceUrl;
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

  constructor(private procedureService: ProcedureService,
              private sanitizer: DomSanitizer) { }

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
