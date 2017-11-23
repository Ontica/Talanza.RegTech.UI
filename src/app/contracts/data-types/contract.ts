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
  clausesList?: ContractClauseRef[];
}

interface ContractRef {
  uid: string;
  name: string;
  url: string;
}

export interface ContractClauseRef {
  uid: string;
  section: string;
  clauseNo: string;
  title: string;
  contractUID: string;
}

export interface ContractClause extends ContractClauseRef {
  text: string;
  hypertext: string;
  sourcePageNo: number;
  notes: string;
  status: string;  
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

export interface Rule {
  uid: string,
  name: string,
  description: string,
  workflowObjectUID: string
}

export interface Obligation {
  uid: string,  
  clauseNo: string,  
  contractUID: string,  
  rules: Rule[],  
  section: string,  
  title: string
}

export function EmptyContract() {

  const empty: Contract = {
    uid: '',
    name: '',
    url: '',
    clausesList: []
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
    clauseNo: '',
    notes: '',
    relatedProcedures: [],
    sourcePageNo: 0,
    status: '',
    text: '',
    hypertext: '',
    title: '',
    section: '',
    contractUID: ''
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
