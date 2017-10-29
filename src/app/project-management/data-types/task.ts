
export interface TaskRef {
  name: string,
  notes: string,
  resourceUID: string,
  startDate: Date,
  targetDate: Date,
  ragStatus: string,
  requestedByUID: string,
  requestedTime: Date,
  responsibleUID: string
  progress: number;
  }

  export function EmptyTask() {
    const empty: TaskRef = {
      name: '',
      notes: '',
      resourceUID: '',
      startDate: new Date(),
      targetDate: new Date(),
      ragStatus: '',
      requestedByUID: '',
      requestedTime: new Date(),
      responsibleUID:'',
      progress: 0
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

  //**** */
  export class Task {
    id: number;
    start_date: string;
    text: string;
    progress: number;
    duration: number;
    parent: number;
    type: string;
}