/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export class LegalInfo {
  public isRegulated: boolean;
  public obligation: string;
  public legalBasis: string;
  public contractClausesAndAnnexes: string;

  constructor() {
    this.isRegulated = false;
    this.obligation = '';
    this.legalBasis = '';
    this.contractClausesAndAnnexes = '';
  }

}
