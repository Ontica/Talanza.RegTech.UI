export interface Parent {
  id: number,
  uid: string,
  type: string,
  name: string
}

export interface Procedure {
  uid: string,
  name: string,
  code: string,
  entity: string
}

export interface KeyValue {
  uid: string,
  name: string
}

export interface ActivityRef {
  uid: string,
  type: string,
  name: string,
  notes: string,
  project: KeyValue,
  responsible: KeyValue,
  parent: Parent,
  estimatedDuration: string,
  startDate: Date,
  targetDate: Date,
  endDate: Date,
  dueDate: Date,
  tags: string[],
  position: number,
  ragStatus: string,
  stage: string,
  status: string,

  visible: string
}

export function EmptyParent() {
  const parent: Parent = {
    id: -1,
    uid: '',
    type: '',
    name: ''
  }

  return parent;
}

export function EmptyProcedure() {
  const procedure: Procedure = {
    uid: '',
    name: '',
    code: '',
    entity: ''
  }

  return procedure;
}

export function EmptyKeyValue() {
  const keyValue: KeyValue = {
    uid: '',
    name: ''
  }

  return keyValue;
}

export function EmptyActivityRef() {
  const activity: ActivityRef = {
    uid: '',
    type: '',
    name: '',
    notes: '',
    project: EmptyKeyValue(),
    responsible: EmptyKeyValue(),
    parent: EmptyParent(),
    estimatedDuration: '',
    startDate: new Date(),
    targetDate: new Date(),
    endDate: new Date(),
    dueDate: new Date(),
    tags: [],
    position: 0,
    ragStatus: '',
    stage: '',
    status: '',
    visible: ''
  }

  return activity;
}
