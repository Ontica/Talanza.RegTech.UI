export interface Parent {
  id: number,
  uid: string,
  type: string, 
  name: string
}               

export interface Procedure {
  uid : string,
  name : string,
  code : string,
  entity: string
}

export interface KeyValue {
  uid: string,
  name: string
}

export interface ActivityRef {
  dueDate : string,
  endDate : Date,
  estimatedDuration : string,
  id : number,
  name : string,
  notes: string,
  parent : Parent,
  procedure : Procedure  
  progress : number,
  project : KeyValue, 
  ragStatus: string,
  requestedBy : KeyValue,
  resource : KeyValue, 
  responsible : KeyValue,
  stage : string,
  startDate : Date,  
  targetDate : Date,
  type : string,  
  uid : string,
  tags: string[],  
  visible : string;
  isCollapsed: boolean;
}

export function EmpityParent () {
  const parent: Parent= {
    id: -1,
    uid: '',
    type: '', 
    name: ''
  }

  return parent;
}

export function EmpityProcedure() {
  const procedure: Procedure = {
    uid : '',
    name : '',
    code : '',
    entity: ''
  }
  
  return procedure;
}

export function EmpityKeyValue() {
  const keyValue: KeyValue = {
    uid: '',
    name: ''
  }

  return keyValue;
}

export function EmpityActivityRef() {
  const activity: ActivityRef = {
    dueDate : '',
    endDate : new Date(),
    estimatedDuration : '',
    id : 0,
    name : '',
    notes: '',
    parent : EmpityParent(),
    procedure : EmpityProcedure(),  
    progress : 0,
    project : EmpityKeyValue(), 
    ragStatus: '',
    requestedBy : EmpityKeyValue(),
    resource : EmpityKeyValue(), 
    responsible : EmpityKeyValue(),
    stage : '',
    startDate : new Date(),  
    targetDate : new Date(),
    type : '',  
    uid : '',
    tags: [],  
    visible : '',
    isCollapsed : false
  }
  
  
  return activity;  
}