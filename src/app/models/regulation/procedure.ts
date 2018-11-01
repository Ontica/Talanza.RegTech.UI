/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Authority } from './authority';


export class FilingCondition {
  public startsWhen: string;
  public startsWhenTrigger: string;
  public startsWhenNotes: string;

  public maxFilingTerm: string;
  public maxFilingTermUnit: string;
  public maxFilingTermNotes: string;

  public issuanceLegalTerm: string;
  public issuanceLegalTermUnit: string;
  public howToFile: string;
  public howToFileAddress: string;

  public deferralsTerm: string;
  public deferralsTermUnit: string;
  public deferralsTermNotes: string;

  public validityTermWhenIssued: string;
  public validityTermUnitWhenIssued: string;
  public ficta: string;

  public hasInnerInteraction: string;

  constructor() {
    this.startsWhen = '';
    this.startsWhenTrigger = '';
    this.startsWhenNotes = '';

    this.maxFilingTerm = '';
    this.maxFilingTermUnit = '';
    this.maxFilingTermNotes = '';

    this.issuanceLegalTerm = '';
    this.issuanceLegalTermUnit = '';

    this.howToFile = '';
    this.howToFileAddress = '';

    this.deferralsTerm = '';
    this.deferralsTermUnit = '';
    this.deferralsTermNotes = '';

    this.validityTermWhenIssued = '';
    this.validityTermUnitWhenIssued = '';
    this.ficta = '';

    this.hasInnerInteraction = '';
  }

}


export class FilingDocuments {

  constructor() {}

}


export class FilingFee {
  public filingFeeType: string;
  public feeAmount: string;
  public legalBasis: string;

  constructor() {
    this.filingFeeType = '';
    this.feeAmount = '';
    this.legalBasis = '';
  }

}


export class LegalInfo {
  public regulationMode: string;
  public obligation: string;
  public legalBasis: string;

  constructor() {
    this.regulationMode = '';
    this.obligation = '';
    this.legalBasis = '';
  }

}


export class Procedure {
  public id: number;
  public uid: string;
  public code: string;
  public shortName: string;
  public modality: string;
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
    this.id = 0;
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

  get fullName(): string {
    return '[' + this.uid + '] ' + this.shortName + this.modality ? '(Modalidad: ' + this.modality + ')' : '';
  }

}


export class ProcedureFilter {

  public officeUID: string;
  public entityUID: string;
  public theme: string;
  public stage: string;
  public contract: string;
  public keywords: string;

  constructor() {
    this.clean();
  }

  public clean(): void {
    this.officeUID = '';
    this.entityUID = '';
    this.theme = '';
    this.stage = '';
    this.contract = '';
    this.keywords = '';
  }

  public toString(): string {
    let filter = '';

    if ((this.entityUID !== '')) {
      filter = this.addFilterConnector(filter) + "AuthEntity.ContactUID='" + this.entityUID + "'";
    }

    if ((this.officeUID !== '')) {
      filter = this.addFilterConnector(filter) + "AuthOffice.ContactUID='" + this.officeUID + "'";
    }

    if ((this.theme !== '')) {
      filter = this.addFilterConnector(filter) + "theme='" + this.theme + "'";
    }

    return filter;
  }

  private addFilterConnector(filter: string): string {
    if (filter !== '') {
      filter += ' AND ';
    }
    return filter;
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


export interface BaseProcedure {
  uid: string;
  name: string;
  modality: string;
  url: string;
  stage: string;
  category: string;
  theme: string;
  entity: string;
  office: string;
  status: string;
}
