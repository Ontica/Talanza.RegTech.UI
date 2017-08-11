export interface ProjectRef {
  uid: string;
  name: string;
  }

export interface ResourceRef {
  uid:string;
  name: string;   
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
   parentId: 2,
   resourceUID: '',   
   responsibleUID: '',
   requestedTime: new Date(),
   requestedByUID: ''   
  }

  return empty;
}