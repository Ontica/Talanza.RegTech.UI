
export interface TaskRef {
  name: string,
  notes: string,
  resourceUID: string,
  startDate: Date,
  dueDate: Date,
  requestedByUID:string,
  requestedTime: Date,
  responsibleUID:string 
 
  }
  
  export function EmptyTask() {
    const empty: TaskRef = {      
      name: '',      
      notes: '',
      resourceUID: '',
      startDate: new Date(),
      dueDate: new Date(),
      requestedByUID: '',
      requestedTime:new Date(),
      responsibleUID:'' 
    }
  
    return empty;
  }