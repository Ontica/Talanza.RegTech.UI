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
  public officialUrl: string;
  public regulationUrl: string;
  public theme: string;
  public executionMode: string;
  public projectType: string;
  public notes: string;
  public authority: Authority;
  public legalInfo: LegalInfo;
  public filingCondition: FilingCondition;
  public filingDocuments: FilingDocuments;
  public filingFee: FilingFee;

  constructor() {
    this.uid = '';
    this.code = '';
    this.shortName = '';
    this.name = '';
    this.officialUrl = '';
    this.regulationUrl = '';
    this.theme = '';
    this.executionMode = '';
    this.projectType = '';
    this.notes = '';
    this.authority = new Authority();
    this.legalInfo = new LegalInfo();
    this.filingCondition = new FilingCondition();
    this.filingDocuments = new FilingDocuments();
    this.filingFee = new FilingFee();
  }

}

export interface Requirement {  
  uid: string,
  name: string,
  type: string,
  appliesTo: string,
  copies: string,
  conditions: string,
  notes: string,
  observations: string, 
  sourceUrl: string,
  sampleUrl: string,
  instructionsUrl: string
}