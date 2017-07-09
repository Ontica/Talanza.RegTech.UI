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
  public uid: string;
  public code: string;
  public shortName: string;
  public name: string;
  public url: string;
  public stage: string;
  public category: string;
  public theme: string;
  public authority: Authority;
  public legalInfo: LegalInfo;
  public filingCondition: FilingCondition;
  public filingDocuments: FilingDocuments;
  public filingFee: FilingFee;
  public status: string;
  public statusNotes: string;
  public msExcelNo: number;

  constructor() {
    this.uid = '';
    this.name = '';
    this.url = '';
    this.stage = '';
    this.category = '';
    this.theme = '';
    this.authority = new Authority();
    this.legalInfo = new LegalInfo();
    this.filingCondition = new FilingCondition();
    this.filingDocuments = new FilingDocuments();
    this.filingFee = new FilingFee();
    this.status = '';
    this.statusNotes = '';
    this.msExcelNo = 0;
  }

}
