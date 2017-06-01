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
  public processes: Process[] = [];

  private _editionMode: boolean;

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

  @ViewChild('modeler') public el: ElementRef;

  private processUID: string = '';

  public constructor(private sanitizer: DomSanitizer, private renderer: Renderer2,
                     private processService: ProcessDefinitionService) {
    this.load();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./modeler/process-modeler.html');
  }

  public ngOnInit() {
    this.setProcesses();
  }

  public createDiagram(): void {
    this.editionMode = true;
    this.modeler.createDiagram();
    this.attachModelerEventHandler();
  }

  public editDiagram(): void {
    this.editionMode = true;
  }

  public getDiagram(): void {
    this.modeler.getXML();
    this.saveDiagram();
  }

  public onChangeSelectedProcess(uid: string): void {
    this.processUID = uid;
  }

  public async openDiagram() {
    if (this.processUID === '') {
      alert('Selecciona un diagrama de la lista');
      return;
    }

    let process = await this.processService.getProcessDiagram(this.processUID);

    this.loadXml(process.bpmnXml);
    this.editionMode = false;
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
    this.attachModelerEventHandler();
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
