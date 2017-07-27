/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export interface Contract {
  uid: string;
  name: string;
  url: string;
  clauses?: ContractClause[];
}

export interface ContractClause {
  uid: string;
  clauseNo: string;
  title: string;
  text: string;
  sourcePageNo: number;

  notes: string;
  status: string;
  relatedProcedures: RelatedProcedures[];

  contractUID: string;
  contractName: string;
}

export class RelatedProcedures {
  public uid: string;
  public procedure: ProcedureDef;
  public maxFilingTerm: number;
  public maxFilingTermType: string;
  public startsWhen: string;
  public startsWhenTrigger: string;
  public notes: string;

  constructor() {
    this.uid = '';
    this.procedure = new ProcedureDef();
    this.maxFilingTerm = 0;
    this.maxFilingTermType = '';
    this.startsWhen = '';
    this.startsWhenTrigger = '';
    this.notes = '';
  }
}

class ProcedureDef {
  public uid: string;
  public code: string;
  public entity: string;
  public name: string;
  public shortName: string;

  constructor() {
    this.uid = '';
    this.code = '';
    this.entity = '';
    this.name = '';
    this.shortName = '';
  }
}


export function EmptyContract() {
  const empty: Contract = {
    uid: '',
    name: '',
    url: '' ,
    clauses: []
  };

  return empty;
}

export function EmptyContractClause() {
  const empty: ContractClause = {
      uid: '',
      clauseNo: '',
      notes: '',
      relatedProcedures: [],
      sourcePageNo: 0,
      status: '',
      text: '',
      title: '',
      contractUID: '',
      contractName: '',
    };
  return empty;
}
