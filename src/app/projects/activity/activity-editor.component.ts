/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'activity-editor',
  template:`
          <div class="editor-container editor-container-style">
            <div class="header">
              <div class="close-button right-position" (click)="onClose()">&times;</div>
              <div class="title">Agregar actividad al proyecto: <b>{{project.name}}</b></div>
            </div>
            <div>
              <activity-selector></activity-selector>
            </div>
          </div>
          
          `,
  styleUrls:['./activity-editor.component.scss']
})

export class ActivityEditorComponent {
 @HostBinding('style.display') public display = 'block';
 @HostBinding('style.position') public position = 'absolute';

 @Output() public onCloseEvent = new EventEmitter();

 public onClose(): void {
    this.onCloseEvent.emit();
  }


}