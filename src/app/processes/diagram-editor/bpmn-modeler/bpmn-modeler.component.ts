/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { AfterContentInit, Component, ElementRef,
         EventEmitter, Input, OnChanges,
         OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Action, EventData, createEventData } from '@app/models/core';

import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';


@Component({
  selector: 'emp-steps-bpmn-modeler',
  template:
    `<div #ref class="diagram-container"></div>`,
  styles: [`
    .diagram-container {
      height: calc(100vh - 270px);
      width: 100%;
    }`
  ]
})
export class BpmnModelerComponent implements AfterContentInit, OnDestroy, OnChanges {

  @Input() xml: string;

  @Input() execute: Action;

  @Output() bpmnModelerEvent = new EventEmitter<EventData>();

  @Output() bpmnModelerError = new EventEmitter<any>();

  @ViewChild('ref', { static: true }) private el: ElementRef;

  private modeler: BpmnJS = new BpmnJS();


  constructor() {
    this.attachBpmnJSEvents();
  }


  ngAfterContentInit() {
    this.modeler.attachTo(this.el.nativeElement);
  }


  ngOnDestroy() {
    this.modeler.destroy();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['xml']) {
      this.modeler.importXML(this.xml, null);

    } else if (changes['execute']) {
      this.executeAction(changes['execute'].currentValue as Action);

    }
  }

  // private methods


  private attachBpmnJSEvents() {
    this.onImportXML();
    this.onEventBusEvents();
  }


  private executeAction(action: Action) {
    if (!action) {
      return;
    }

    switch (action.type) {
      case 'save':
        this.save();
        return;
    }
  }


  private onEventBusEvents() {
    const eventBus = this.modeler.get('eventBus');

    eventBus.on('element.dblclick', function(e) {
      console.log(event, 'on', e.element.id, e.element);
    });

  }


  private onImportXML() {
    this.modeler.on('import.done', ({ err }) => {
      if (!err) {
        this.modeler.get('canvas').zoom('fit-viewport');
      } else {
        this.bpmnModelerError.emit(err);
      }
    });
  }


  private save() {
    this.modeler.saveXML((err: any, xml: any) => {
      if (!err) {
        const eventData = createEventData('save', { xml: xml });

        this.bpmnModelerEvent.emit(eventData);

      } else {
        this.bpmnModelerError.emit(err);
      }
    });
  }

}
