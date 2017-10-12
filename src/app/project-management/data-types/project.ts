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

export interface Activity {
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
   requestedByUID:string
   isMilestone: boolean,
   createSubproject: boolean,
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

export function EmptyActivity() {
  const empty: Activity = {   
   completionProgress: 0,
   estimatedStart: new Date(),
   estimatedEnd: new Date(),
   estimatedDuration: '',
   name: '',
   notes: '',
   parentId: -1,
   resourceUID: '',   
   responsibleUID: '',
   requestedTime: new Date(),
   requestedByUID: '',
   isMilestone: false,
   createSubproject: false
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

