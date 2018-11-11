/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ProcessService } from '@app/services/regulation';

import { Process } from '@app/models/regulation';


@Component({
  selector: 'emp-steps-process-editor',
  templateUrl: './process-editor.component.html',
  styleUrls: ['./process-editor.component.scss']
})
export class ProcessEditorComponent implements OnInit {

  url: SafeResourceUrl;
  process: Process;
  processes: Process[] = [];

  @ViewChild('modeler') el: ElementRef;

  activateSaveNewDiagramPopup = false;
  isNewDiagram = false;
  _editionMode: boolean;
  saveAsLabel = 'Guardar como';
  title = 'Editor de procesos';

  showShapeInfo = false;

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

  private processUID = '';

  constructor(private processService: ProcessService,
              private sanitizer: DomSanitizer,
              private ref: ChangeDetectorRef) {
    this.load();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./modeler/process-modeler.html');
  }

  ngOnInit() {
    this.setProcesses();
  }

  createDiagram(): void {
    alert('Lo sentimos ...\n\nPor el momento no es posible crear nuevos procesos.');

    return;

    // this.isNewDiagram = true;
    // this.editionMode = true;
    // this.saveAsLabel = 'Guardar';
    // this.modeler.createDiagram();
    // this.title = 'Nuevo proceso';
    // this.attachModelerEventHandler();
  }

  onOpenForEdition(): void {
    this.editionMode = true;
  }

  onCancelChanges(): void {
    this.refreshDiagram();
  }

  async onSaveDiagram() {
    this.editionMode = false;

    const xml = this.modeler.getXML();

    this.process.xml = xml;

    await this.processService.saveDiagramChanges(this.process);

    this.refreshDiagram();
  }

  saveNewDiagram(process: Process): void {
    this.closeSaveNewDiagramPopup();

    this.process = process;
    const xml = this.modeler.getXML();
    this.process.xml = xml;
    this.processService.saveNewDiagram(this.process);

    this.isNewDiagram = false;
    this.saveAsLabel = 'Guardar como';
    this.editionMode = true;
    this.title = process.name;
  }

  showSaveNewDiagramPopup(): void {
    this.editionMode = false;
    this.activateSaveNewDiagramPopup = true;
  }

  closeSaveNewDiagramPopup(): void {
    this.activateSaveNewDiagramPopup = false;
    this.editionMode = true;
  }

  closeShapeInfo(): void {
    this.showShapeInfo = false;
    this.editionMode = true;
    this.ref.detectChanges();
  }

  onChangeSelectedProcess(uid: string): void {
    this.processUID = uid;

    this.refreshDiagram();
  }

  async refreshDiagram() {
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
    const bpmnType = JSON.parse(element);
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
