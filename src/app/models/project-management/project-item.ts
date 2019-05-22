/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Activity } from './activity';
import { Task } from './task';
import { Project } from './project';
import { Contact } from '../core/contact';


export type ProjectItem = Activity | Task;


export interface ProjectItemFilter {
  projects: Project[];
  responsibles: Contact[];
  themes: string[];
}


export const EmptyProjectItemFilter: ProjectItemFilter = {
  projects: [],
  responsibles: [],
  themes: [],
};

