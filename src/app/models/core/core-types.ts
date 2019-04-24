/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Action {
  type: string;
  payload?: any;
}


export interface EventData {
  type: string;
  payload?: any;
}

export function createAction(type: string, payload?: any): Action {
  const action: Action = {
    type: type,
    payload: payload
  };

  return action;
}


export function createEventData(type: string, payload?: any): EventData {
  const event: EventData = {
    type: type,
    payload: payload
  };

  return event;
}


export interface Identifiable {
  readonly uid: string;
  name: string;
}


export const Empty: Identifiable = {
  uid: '',
  name: 'No determinado',
};


export interface PartitionedType {
  type: string;
}


export function isEmpty(instance: Identifiable): boolean {
  return (!instance || !instance.uid ||
          instance.uid === '' || instance.uid === 'Empty');
}


export function isTypeOf(instance: PartitionedType, typeName: string) {
  if (!instance) {
    return false;
  }
  return (instance.type === typeName);
}
