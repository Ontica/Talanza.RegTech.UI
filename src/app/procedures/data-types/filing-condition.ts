/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export class FilingCondition {
  startsWhen: string;
  startsWhenTrigger: string;
  maxFilingTerm: string;
  issuanceLegalTerm: string;
  howToFile: string;
  allowsDeferrals: string;
  deferralsTermNotes: string;
  deferralsConditionNotes: string;
  validityTermWhenIssued: string;
  simultaneousDelivery: string;
  startsWhenNotes: string;
  maxFilingTermNotes: string;
  issuanceLegalTermNotes: string;

  constructor() {
    this.startsWhen = '';
    this.startsWhenTrigger = '';
    this.maxFilingTerm = '';
    this.issuanceLegalTerm = '';
    this.howToFile = '';
    this.allowsDeferrals = '';
    this.deferralsTermNotes = '';
    this.deferralsConditionNotes = '';
    this.validityTermWhenIssued = '';
    this.simultaneousDelivery = '';
    this.startsWhenNotes = '';
    this.maxFilingTermNotes = '';
    this.issuanceLegalTermNotes = '';
  }
}
