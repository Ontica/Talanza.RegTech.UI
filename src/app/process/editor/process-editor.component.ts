/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Process } from '../data-types/process';
import { ProcessService } from '../services/process.service';

@Component({
  selector: 'process-editor',
  templateUrl: './process-editor.component.html',
  styleUrls: ['./process-editor.component.scss'],
  providers: [ProcessService]
})

export class ProcessEditorComponent implements OnInit {

  public url: SafeResourceUrl;
  public process: Process;
  public processes: Process[] = [];

  @ViewChild('modeler') public el: ElementRef;

  public activateSaveNewDiagramPopup = false;
  public isNewDiagram = false;
  public _editionMode: boolean;
  public saveAsLabel = 'Guardar como';
  public title = 'Editor de procesos';

  public showShapeInfo = false;

  get editionMode() {
    return this._editionMode;
  }

  set editionMode(edition: boolean) {
    if (edition) {
      this.modeler.editionMode = true;
    } else {
      this.modeler.editionMode = false;
    }
    this._editionMode = edition;
  }

  private processUID: string = '';

  public constructor(private sanitizer: DomSanitizer, private processService: ProcessService,
                     private ref: ChangeDetectorRef) {
    this.load();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./modeler/process-modeler.html');
  }

  public ngOnInit() {
    this.setProcesses();
  }

  public createDiagram(): void {
    alert('Lo sentimos ...\n\nPor el momento no es posible crear nuevos procesos.');

    return;

    // this.isNewDiagram = true;
    // this.editionMode = true;
    // this.saveAsLabel = 'Guardar';
    // this.modeler.createDiagram();
    // this.title = 'Nuevo proceso';
    // this.attachModelerEventHandler();
  }

  public onOpenForEdition(): void {
    this.editionMode = true;
  }

  public onCancelChanges(): void {
    this.refreshDiagram();
  }

  public async onSaveDiagram() {
    this.editionMode = false;

    let xml = this.modeler.getXML();

    this.process.xml = xml;

    await this.processService.saveDiagramChanges(this.process);

    this.refreshDiagram();
  }

  public saveNewDiagram(process: Process): void {
    this.closeSaveNewDiagramPopup();

    this.process = process;
    let xml = this.modeler.getXML();
    this.process.xml = xml;
    this.processService.saveNewDiagram(this.process);

    this.isNewDiagram = false;
    this.saveAsLabel = 'Guardar como';
    this.editionMode = true;
    this.title = process.name;
  }

  public showSaveNewDiagramPopup(): void {
    this.editionMode = false;
    this.activateSaveNewDiagramPopup = true;
  }

  public closeSaveNewDiagramPopup(): void {
    this.activateSaveNewDiagramPopup = false;
    this.editionMode = true;
  }

  public closeShapeInfo(): void {
    this.showShapeInfo = false;
    this.editionMode = true;
    this.ref.detectChanges();
  }

  public onChangeSelectedProcess(uid: string): void {
    this.processUID = uid;
    this.refreshDiagram();
  }

  public async refreshDiagram() {
    this.isNewDiagram = false;

    if (this.processUID === '') {
      alert('Selecciona un diagrama de la lista');
      return;
    }

    this.process = await this.processService.getProcessDiagram(this.processUID);

    this.loadXml(this.process.xml);
    this.title = this.process.name;
    this.editionMode = false;
    this.saveAsLabel = 'Guardar como';
  }

  private get modeler() {
    return this.el.nativeElement.contentWindow.modeler;
  }

  private attachModelerEventHandler() {
    this.modeler.suscribeToDoubleClick((e) => this.onModelerDoubleClick(e));
  }

  private load() {
    console.log('loading process definition component ...');
  }

  private loadXml(xml: any): void {
    this.modeler.loadXML(xml);
    this.attachModelerEventHandler();
  }

  private onModelerDoubleClick(element: any): void {
    this.editionMode = false;
    let bpmnType = JSON.parse(element);
    this.selectBpmnElmentInfo(bpmnType.type);
  }

  private setProcesses(): void {
    this.processService.getProcesses().then((processes) => {
      this.processes = processes;
    });
  }

  private selectBpmnElmentInfo(bpmnElementType: string): void {
    switch (bpmnElementType) {
      case 'bpmn:Task':
        this.showTaskEditor();
        break;
      default: return;
    }

  }

  private showTaskEditor(): void {
    this.showShapeInfo = true;
    this.ref.detectChanges();
  }

}
