import { Component, OnInit } from '@angular/core';

@Component({
  selector:'selected-procedure',
  templateUrl:'./contract-selected-procedure.component.html',
  styleUrls:['./contract-selected-procedure.component.scss']
})

export class ContractSelectedProcedureComponent  {

  public isVisibleGeneralInfo = true;
  public isInitialTermsVisible = true;
  public isPaymentInfoVisible = true;
  public isAuthorityInfoVisible = true;

  ngOnInint() {

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
  
 
}