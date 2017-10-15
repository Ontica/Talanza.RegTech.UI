
import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding,
  Input, Output, Pipe, PipeTransform, Renderer2, ViewChild, OnInit
} from '@angular/core';

import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { ProcedureService } from '../../services/procedure.service';

import { Process } from '../../../process/data-types/process';
import { ProcessService } from '../../../process/services/process.service';

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
  providers:[ ProcedureService, ProcessService]
})

export class PVGeneralInfoComponent implements OnInit{
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @ViewChild('modeler') public el: ElementRef;

  public isVisibleGeneralInfo = true;
  public isInitialTermsVisible = true;
  public isPaymentInfoVisible = true;
  public isAuthorityInfoVisible = true;

  public process: Process;
  public url: SafeResourceUrl;
  public editionMode = false;

  public procedure: any;

  @Output() public onCloseEvent = new EventEmitter();

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
              private sanitizer: DomSanitizer,
              private processService: ProcessService) {
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./modeler/process-modeler.html');
  }

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

  public close(): void {
    this.onCloseEvent.emit();
  }

  private loadProcedure(): void {
     this.procedureService.getProcedure(this.procedureUID).then((procedure) => {
       console.log(procedure);
     this.procedure = procedure;
    });
  }

  private async loadProcess() {
    this.modeler.editionMode = false;
    let processUID = 'cOTI5kqHVhdY'
    this.process = await this.processService.getProcessDiagram(processUID);
    this.loadXml(this.process.xml);
  }

 private get modeler() {
    return this.el.nativeElement.contentWindow.modeler;
  }

  private attachModelerEventHandler() {
    this.modeler.suscribeToDoubleClick((e) => this.onModelerDoubleClick(e));
  }

  private loadXml(xml: any): void {
    this.modeler.loadXML(xml);
    this.attachModelerEventHandler();
  }

  private onModelerDoubleClick(element: any): void {

    let bpmnType = JSON.parse(element);
  //  this.selectBpmnElmentInfo(bpmnType.type);
  }


}
