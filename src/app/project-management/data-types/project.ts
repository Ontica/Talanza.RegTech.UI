export interface Contract {
  uid: string;
  name: string;
}

export interface ProjectRef {
  uid: string;
  name: string;
}

 export interface ProcessModel {
   uid: string;
   name: string;
   notes: string;
   links: Link[];
 } 

 export interface Link {
   name: string;
   link: string;
 }

 export interface Step {
   uid: string;
   stepNo: string;
   name: string;
   involvedParty: string;
 }

 export interface Stage {
   uid: string,
   name: string
 }

export interface ResourceRef {
  uid:string;
  name: string;  
  notes: string;
  type: string; 
}

export interface PersonRef {
  uid: string;
  name: string;
  shortName: string;
}
 
export interface TaskRef {
   completionProgress: number,
   estimatedStart: Date,
   estimatedEnd: Date,
   estimatedDuration: string,
   name: string,
   notes: string,
   parentId: number,
   resourceUID: string,   
   responsibleUID:string,
   requestedTime: Date,
   requestedByUID:string,
   projectUID: string,
   type:string
}

export function EmptyProjectRef() {
  const empty: ProjectRef = {
    uid: '',
    name: ''
  }

  return empty;
}

export function EmptyProcessModel() {
  const empty: ProcessModel = {
    uid: '',
    name: '',
    notes: '',
    links: []
  }

  return empty;
}

export function EmptyContact() {
  const empty:  PersonRef = {
    uid: '',
    name: '',
    shortName: ''
  }

  return empty;
}

export function EmptyContract() {
  const empty: Contract = {
    uid: '',
    name: ''
  }

  return empty;
}

export function EmptyStage() {
  const empty: Stage = {
    uid: '',
    name: ''
  }

  return empty;
}

