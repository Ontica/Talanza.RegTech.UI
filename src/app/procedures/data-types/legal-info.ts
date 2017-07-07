/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export class LegalInfo {
  isRegulated: boolean;
  obligation: string;
  legalBasis: string;
  contractClausesAndAnnexes: string;

  constructor() {
    this.isRegulated = false;
    this.obligation = '';
    this.legalBasis = '';
    this.contractClausesAndAnnexes = '';
  }

}