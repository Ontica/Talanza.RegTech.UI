/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

@Component({
  selector: 'contracts-main-page',
  templateUrl: './contracts-main-page.component.html',
  styleUrls: ['./contracts-main-page.component.scss']
})

export class ContractsMainPageComponent {

  public isShowContractEditorWindow = false;

  public closeContractEditorWindow(): void  {
    this.isShowContractEditorWindow = false;
  }
  
  public showContractEditorWindow(): void {
    this.isShowContractEditorWindow = true;
  }

}
