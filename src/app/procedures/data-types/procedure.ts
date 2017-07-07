/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Authority } from './authority';
import { LegalInfo } from './legal-info';
import { FilingCondition } from './filing-condition';
import { FilingDocuments } from './filing-documents';
import { FilingFee } from './filing-fee';

export class Procedure {
  uid: string;
  name: string;
  url: string;
  stage: string;
  category: string;
  theme: string;
  authority: Authority;
  legalInfo: LegalInfo;
  filignCondition: FilingCondition;
  filingDocuments: FilingDocuments;
  filingFee: FilingFee;
  status: string;
  statusNotes: string;
  msExcelNo: number;

  constructor() {
    this.uid = '';
    this.name = '';   
    this.url = '';    
    this.stage = '';
    this.category = '';
    this.theme = '';
    this.authority = new Authority();
    this.legalInfo = new LegalInfo();
    this.filignCondition = new FilingCondition();
    this.filingDocuments = new FilingDocuments();
    this.filingFee = new FilingFee();
    this.status = '';
    this.statusNotes = '';
    this.msExcelNo = 0;    
  }

}
