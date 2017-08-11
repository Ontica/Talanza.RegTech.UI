/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component }  from '@angular/core';

@Component ({
  selector: 'worklists-main-page',
  templateUrl: './worklists-main-page.component.html',
  styleUrls: ['./worklists-main-page.component.scss']
})

export class WorklistsMainPageComponent {
  
  public isAddActivityEditorWindowVisible = false;

  public onCloseAddActivityEditorWindow(): void {    
    this.isAddActivityEditorWindowVisible = false;
  }

  public onClickAddActivity():void {
    alert("Esta operación se encuentra en desarrollo...");
    
  }

}
