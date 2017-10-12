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

interface ContractRef {
  uid: string;
  name: string;
  url: string;
}

export interface ContractClause {
  uid: string;
  contract: ContractRef;
  clauseNo: string;
  title: string;
  text: string;
  sourcePageNo: number;
  notes: string;
  status: string;
  section: string;
  relatedProcedures: RelatedProcedure[];
}

export interface RelatedProcedure {
  uid: string;
  procedure: ProcedureRef;
  maxFilingTerm: number;
  maxFilingTermType: string;
  startsWhen: string;
  startsWhenTrigger: string;
  notes: string;
}

interface ProcedureRef {
  uid: string;
  code: string;
  entity: string;
  name: string;
  shortName: string;
}

export function EmptyContract() {
  const empty: Contract = {
    uid: '',
    name: '',
    url: '',
    clauses: []
  };

  return empty;
}

export function EmptyContractRef() {
  const empty: ContractRef = {
    uid: '',
    name: '',
    url: ''
  };

  return empty;
}

export function EmptyContractClause() {
  const empty: ContractClause = {
    uid: '',
    contract: EmptyContractRef(),
    clauseNo: '',
    notes: '',
    relatedProcedures: [],
    sourcePageNo: 0,
    status: '',
    text: '',
    title: '',
    section:''
  };

  return empty;
}

export function EmptyRelatedProcedures() {
  const empty: RelatedProcedure = {
    uid: '',
    procedure: EmptyProcedureRef(),
    maxFilingTerm: 0,
    maxFilingTermType: '',
    startsWhen: '',
    startsWhenTrigger: '',
    notes: ''
  };

  return empty;
}

export function EmptyProcedureRef() {
  const empty: ProcedureRef = {
    uid: '',
    code: '',
    entity: '',
    name: '',
    shortName: ''
  };

  return empty;
}
