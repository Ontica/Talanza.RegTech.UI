/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface DataFormField {
  value?: any;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType: string;
  type?: string;
  options?: {key: string, value: string}[];
}
