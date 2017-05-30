/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'process-definition',
  templateUrl: './process-definition.component.html',
  styleUrls: ['process-definition.component.css']
})

export class ProcessDefinitionComponent {

  public url: SafeResourceUrl;
  public suscriber: any;
  public isReadOnly = true;

  @ViewChild('modeler') public el: ElementRef;
   
  public constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    this.load();
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('./modeler/process-modeler.html');
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

  public openDiagram(): void {
    this.modeler.loadXMLFile('vendor/bpmn-js/sample-diagram.bpmn');
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

}
