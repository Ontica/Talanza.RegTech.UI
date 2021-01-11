/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Contact } from "@app/core";

import { EmptyProject, Project, ProjectItemStatus } from "@app/models/project-management";

export interface MainSidebarValues {
  projects: Project[];
  selectedProject: Project;
  responsibles: Contact[];
  tags: string[];
  themes: string[];
  entities: string[];
  keywords: string;
  status: ProjectItemStatus;
}

export const DefaultSidebarValues: MainSidebarValues = {
  projects: [],
  selectedProject: EmptyProject,
  responsibles: [],
  tags: [],
  themes: [],
  entities: [],
  keywords: '',
  status: 'All tasks'
};
