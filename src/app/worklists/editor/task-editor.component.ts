/**
* @license
* Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

import { Activity, EmptyActivity, ProjectRef } from '../data-types/project';

@Component({
 selector:'task-editor',
 template:`
   <div class="editor-container editor-container-style">
 <div class="header">
   <div class="close-button right-position" (click)="onClose()">&times;</div>
   <div class="title">890 - Elaborar documentación para el plan de trabajo </div>
   <div class="subtitle"><b>Liliana Martínez R. (en Elaboración)</b> <div class="right-position">Asignado el:5 Ago 2017 (hace 2 días)</div></div>
 </div>
 <br>
 <div class="tab">
   <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='deliverables-tab'" (click)="onChangeTab('deliverables-tab')">Entregables</button>
   <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='references-tab'" (click)="onChangeTab('references-tab')">Refrencias</button>
   <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='control-state-tab'" (click)="onChangeTab('control-state-tab')">Control y estado de la tarea</button>
   <button class="tab-links left-position" [disabled]="isDisabled" [class.selected]="currentSelectedTab==='history-tab'" (click)="onChangeTab('history-tab')">Historia</button>
 </div>
 <div [ngSwitch]="currentSelectedTab" class="form-frame">   
  <task-deliverables *ngSwitchCase="'deliverables-tab'" ></task-deliverables>
  <task-references *ngSwitchCase="'references-tab'" ></task-references>
  <task-control-and-state *ngSwitchCase="'control-state-tab'"></task-control-and-state>
  <task-history *ngSwitchCase="'history-tab'"></task-history>  
 </div>
</div>

 `,
 styleUrls:['./task-editor.component.scss'],

})
export class TaskEditorComponent {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();

  public currentSelectedTab = 'deliverables-tab';
  
  public onChangeTab(newSelectedTab: string): void {
    this.currentSelectedTab = newSelectedTab;
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

}
