/**
 * @license
 * Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Identifiable } from '../../core/core-data-types';

export interface Contract extends Identifiable {

}

export interface Project extends Identifiable {

}

export interface ProcessModel extends Identifiable {
  notes: string;
  links: Link[];
}

export interface Link {
  name: string;
  link: string;
}

export interface Step extends Identifiable {
  stepNo: string;
  involvedParty: string;
}

export interface Stage extends Identifiable {

}

export interface Resource extends Identifiable {
  type: string;
  notes: string;
}
