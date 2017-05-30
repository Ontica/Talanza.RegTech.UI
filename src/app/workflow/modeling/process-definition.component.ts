/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Process } from './process';
import { ProcessDefinitionService } from './Process-definition.service';

@Component({
  selector: 'process-definition',
  templateUrl: './process-definition.component.html',
  styleUrls: ['process-definition.component.css'],
  providers: [ProcessDefinitionService]
})

export class ProcessDefinitionComponent implements OnInit {

  public url: SafeResourceUrl;
  public suscriber: any;
  public isReadOnly = true;
  public processes: Process[] = [];

  @ViewChild('modeler') public el: ElementRef;

  private processId: number = -1;

  public constructor(private sanitizer: DomSanitizer, private renderer: Renderer2,
                     private processService: ProcessDefinitionService) {
    this.load();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./modeler/process-modeler.html');
  }

  public ngOnInit() {
    this.setProcesses();
  }

  public createDiagram(): void {
    this.modeler.createDiagram();
    this.attachModelerEventHandler();
  }

  public editDiagram(): void {
    this.isReadOnly = false;
  }

  public getDiagram(): void {
    this.modeler.getXML();
    this.saveDiagram();
  }

  public onChangeSelectedProcess(processId: number): void {
    this.processId = +processId;
  }

  public openDiagram(): void {
    if (this.processId === -1) {
      alert('Selecciona un diagrama de la lista');
      return;
    }
    let processDiagram = this.processService.getProcessDiagram(this.processId);

    this.modeler.loadXMLFile(processDiagram);
    this.attachModelerEventHandler();
  }

  public sendInfo(): void {
    this.modeler.parameters('mensaje');
  }

  private get modeler() {
    return this.el.nativeElement.contentWindow.modeler;
  }

  private attachModelerEventHandler() {
    this.modeler.suscribeToDoubleClick(this.onModelerDoubleClick);
  }

  private load() {
    console.log('loading process definition component ...');
  }

  private loadXml(xml: any): void {
    this.modeler.loadXML(xml);
  }

  private onModelerDoubleClick(element: any): void {
    alert('elemento recibido en Angular: ' + element);
  }

  private saveDiagram(): void {
    this.renderer.listen('window', 'message', (evt) => {
      let xml = evt.data;
      console.log(xml);
    });
  }

  private setProcesses(): void {
    this.processService.getProcesses().then((processes) => {
      this.processes = processes;
    });
  }

}
