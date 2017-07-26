export class Clause {
  public uid: string;
  public clauseNo: string;
  public notes: string;
  public relatedProcedures: RelatedProcedures[];
  public sourcePageNo: number;
  public status: string;
  public text: string;
  public title: string;

  constructor() {
    this.uid = '';
    this.clauseNo = '';
    this.notes = '';
    this.relatedProcedures = [];
    this.sourcePageNo = 0;
    this.status = '';
    this.text = '';
    this.title = '';
  }
}

export class RelatedProcedures {
  public uid: string;
  public procedure: RelatedProcedureDef;
  public maxFilingTerm: number;
  public maxFilingTermType: string;
  public startsWhen: string;
  public startsWhenTrigger: string;
  public notes: string;

  constructor() {
    this.uid = '';
    this.procedure = new RelatedProcedureDef();
    this.maxFilingTerm = 0;
    this.maxFilingTermType = '';
    this.startsWhen = '';
    this.startsWhenTrigger = '';
    this.notes = '';
  }
}

class RelatedProcedureDef {
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

export class SmallClause {
  public uid: string;
  public contractUID: string;
  public contractName: string;

  constructor() {
    this.uid = '';
    this.contractUID = '';
    this.contractName = '';
  }
}
