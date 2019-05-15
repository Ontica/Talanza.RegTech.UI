/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, PartitionedType } from '../core';


export interface BaseProcedure extends Identifiable {
  id: number;
  shortName: string;
  modality: string;
  code: string;
  theme: string;
  entityName: string;
}


export interface Procedure extends BaseProcedure {
  projectType: string;
  executionMode: string;

  authorityName: string;
  authorityTitle: string;
  authorityContact: string;

  legalInfo: LegalInfo;
  filingCondition: FilingCondition;
  filingFee: FilingFee;
  requirements: Array<any>;

  officialUrl: string;
  regulationUrl: string;
  notes: string;

  hypertext: ProcedureHypertext;
}


export interface FilingCondition {
  startsWhen: string;
  startsWhenTrigger: string;
  startsWhenNotes: string;

  maxFilingTerm: string;
  maxFilingTermUnit: string;
  maxFilingTermNotes: string;

  issuanceLegalTerm: string;
  issuanceLegalTermUnit: string;
  howToFile: string;
  howToFileAddress: string;

  deferralsTerm: string;
  deferralsTermUnit: string;
  deferralsTermNotes: string;

  validityTermWhenIssued: string;
  validityTermUnitWhenIssued: string;
  ficta: string;

  hasInnerInteraction: string;
}


export interface FilingDocuments {

}


export interface FilingFee {
  filingFeeType: string;
  feeAmount: string;
  legalBasis: string;
}


export interface LegalInfo {
  regulationMode: string;
  obligation: string;
  legalBasis: string;
}


export class ProcedureFilter {
  officeUID: string;
  entityUID: string;
  theme: string;
  stage: string;
  contract: string;
  keywords: string;

  constructor() {
    this.clean();
  }

  clean() {
    this.officeUID = '';
    this.entityUID = '';
    this.theme = '';
    this.stage = '';
    this.contract = '';
    this.keywords = '';
  }


  toString() {
    let filter = '';

    if (this.entityUID) {
      filter = this.addFilterConnector(filter) + 'Entity=\'' + this.entityUID + '\'';
    }

    // if (this.officeUID) {
    //   filter = this.addFilterConnector(filter) + 'AuthOffice.ContactUID=\'' + this.officeUID + '\'';
    // }

    if (this.theme) {
      filter = this.addFilterConnector(filter) + 'theme=\'' + this.theme + '\'';
    }

    return filter;
  }


  private addFilterConnector(filter: string) {
    if (filter !== '') {
      filter += ' AND ';
    }
    return filter;
  }

}



export interface ProcedureHypertext {
  legalBasis: string;
  notes: string;
  maxFilingTermNotes: string;
  deferralsTermNotes: string;
}


export interface Requirement extends Identifiable, PartitionedType {
  appliesTo: string;
  copies: string;
  conditions: string;
  notes: string;
  observations: string;
  sourceUrl: string;
  sampleUrl: string;
  instructionsUrl: string;
}
