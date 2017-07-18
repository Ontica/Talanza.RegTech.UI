/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export class LegalInfo {
  public regulationStatus: string;
  public obligation: string;
  public legalBasis: string;
  public contractClausesAndAnnexes: string;

  constructor() {
    this.regulationStatus = '';
    this.obligation = '';
    this.legalBasis = '';
    this.contractClausesAndAnnexes = '';
  }

}
