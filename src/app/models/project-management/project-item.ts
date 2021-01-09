/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Project, EmptyProject } from './project';
import { Activity } from './activity';
import { Task } from './task';
import { Contact } from '../../core/data-types/contact';


export type ProjectItem = Activity | Task;

export type ProjectItemStatus = 'Incomplete' | 'Completed' | 'All tasks';

export interface ProjectItemFilter {
  projects: Project[];
  selectedProject: Project;
  responsibles: Contact[];
  tags: string[];
  themes: string[];
  keywords: string;
  status: ProjectItemStatus;
}


export const EmptyProjectItemFilter: ProjectItemFilter = {
  projects: [],
  selectedProject: EmptyProject,
  responsibles: [],
  tags: [],
  themes: [],
  keywords: '',
  status: 'All tasks'
};
