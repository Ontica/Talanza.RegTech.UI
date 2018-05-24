/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Identifiable {
  readonly uid: string;
  name: string;
}


export const Empty: Identifiable = {
  uid: '',
  name: 'No determinado',
}


export function isEmpty(instance: Identifiable): boolean {
  return (!instance || !instance.uid ||
    instance.uid === '' || instance.uid === 'Empty');
}


export interface KeyValue {
  readonly key: string;
  readonly value: any;
}


export const KeyValue_Empty: KeyValue = {
  key: 'Empty',
  value: 'Sin valor',
}


export interface Contact extends Identifiable {

}
