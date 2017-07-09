/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export class FilingCondition {
  public startsWhen: string;
  public startsWhenTrigger: string;
  public maxFilingTerm: string;
  public issuanceLegalTerm: string;
  public howToFile: string;
  public allowsDeferrals: string;
  public deferralsTermNotes: string;
  public deferralsConditionNotes: string;
  public validityTermWhenIssued: string;
  public simultaneousDelivery: string;
  public startsWhenNotes: string;
  public maxFilingTermNotes: string;
  public issuanceLegalTermNotes: string;

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
