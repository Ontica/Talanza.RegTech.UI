
import { 
  ChangeDetectorRef, Component, EventEmitter, HostBinding,
  Input, Output, Pipe, PipeTransform 
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser'

import { ProcedureService } from '../../procedures/services/procedure.service';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {  
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector:'selected-procedure',
  templateUrl:'./contract-selected-procedure.component.html',
  styleUrls:['./contract-selected-procedure.component.scss'],
  providers:[ ProcedureService]
})

export class ContractSelectedProcedureComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  public isVisibleGeneralInfo = true;
  public isInitialTermsVisible = true;
  public isPaymentInfoVisible = true;
  public isAuthorityInfoVisible = true;

  public procedure: any;
  
  @Output() public onCloseEvent = new EventEmitter();

  private _procedureUID: string = "";
  @Input()
  set procedureUID(procedureUID: string) {
    this._procedureUID = procedureUID;
    this.loadProcedure();
    console.log(this.procedure);
  }
  get procedureUID(): string {
    return this._procedureUID;
  }

  constructor(private procedureService: ProcedureService) {}
    
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

  public close(): void {
    this.onCloseEvent.emit();
  }
  
  private loadProcedure(): void {
  
     this.procedureService.getProcedure(this.procedureUID).then((procedure) => {
     this.procedure = procedure;    
     console.log(this.procedure);
    });
  }
  
}
