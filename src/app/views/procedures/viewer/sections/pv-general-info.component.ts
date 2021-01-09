/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { Procedure } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-pv-general-info',
  templateUrl: './pv-general-info.component.html',
  styleUrls: ['./pv-general-info.component.scss']
})
export class PVGeneralInfoComponent {

  editionMode = false;
  isVisibleGeneralInfo = true;
  isVisibleObligationsInfo = true;
  isInitialTermsVisible = true;
  isPaymentInfoVisible = true;
  isAuthorityInfoVisible = true;

  @Input()
  get procedure() { return this._procedure; }
  set procedure(procedure: Procedure) {
    if (!procedure) {
      return;
    }
    this._procedure = procedure;
  }
  private _procedure: Procedure;


  get projectTypes(): string {
    const types = ['Terrestre', 'Aguas someras', 'Aguas profundas', 'No convencionales'];

    let temp = '';

    for (let i = 0; i < types.length; i++) {
      // tslint:disable-next-line:no-bitwise
      if ((this.procedure.projectTypeFlags & (2 ** i)) !== 0) {
        temp += (temp.length !== 0 ? ', ' : '') + types[i];
      }
    }

    return temp;
  }


  get stages(): string {
    const stages = ['ETA', 'Exploración', 'Evaluación', 'Extracción', 'Transición final'];

    let temp = '';

    for (let i = 0; i < stages.length; i++) {
      // tslint:disable-next-line:no-bitwise
      if ((this.procedure.stageFlags & (2 ** i)) !== 0) {
        temp += (temp.length !== 0 ? ', ' : '') + stages[i];
      }
    }

    return temp;
  }


  onDisplayGeneralInfo() {
    this.isVisibleGeneralInfo = !this.isVisibleGeneralInfo;
  }


  onDisplayObligationsInfo() {
    this.isVisibleObligationsInfo = !this.isVisibleObligationsInfo;
  }


  onDisplayInitialTerms() {
    this.isInitialTermsVisible = !this.isInitialTermsVisible;
  }


  onDisplayPaymentInfo() {
    this.isPaymentInfoVisible = !this.isPaymentInfoVisible;
  }


  onDisplayAuthorityInfo() {
    this.isAuthorityInfoVisible = !this.isAuthorityInfoVisible;
  }


  openExternalWindow(url: string) {
    if (!url.startsWith('http')) {
      url = 'http://' + url;
    }
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

}
