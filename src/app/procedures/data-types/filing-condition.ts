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
