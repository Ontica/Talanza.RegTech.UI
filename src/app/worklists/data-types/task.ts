
export interface TaskRef {
  name: string,
  notes: string,
  resourceUID: string,
  startDate: Date,
  targetDate: Date,
  requestedByUID: string,
  requestedTime: Date,
  responsibleUID: string 
 
  }
  
  export function EmptyTask() {
    const empty: TaskRef = {      
      name: '',      
      notes: '',
      resourceUID: '',
      startDate: new Date(),
      targetDate: new Date(),
      requestedByUID: '',
      requestedTime:new Date(),
      responsibleUID:'' 
    }
  
    return empty;
  }

  export interface ClosedTask {
    endDate: Date,
    requestedByUID: string
  }

  export function EmptyClosedTask() {
    const empty: ClosedTask = {
      endDate: new Date(),
      requestedByUID: ''
    }

    return empty;
  }