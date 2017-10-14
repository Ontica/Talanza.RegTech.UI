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
  parent : Parent,
  procedure : Procedure  
  progress : number,0
  project : KeyValue, 
  requestedBy : KeyValue,
  resource : KeyValue, 
  responsible : KeyValue,
  stage : string,
  startDate : Date,  
  targetDate : Date,
  type : string,  
  uid : string,  
  visible : string
}