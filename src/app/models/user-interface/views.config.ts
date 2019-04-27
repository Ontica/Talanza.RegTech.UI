/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View } from './user-interface';


export const HomePageViews: View[] = [
  {
    name: 'Projects.Tasks',
    title: 'Tasks',
    url: '/home/tasks'
  },
  {
    name: 'Projects.Gantt',
    title: 'Gantt chart',
    url: '/home/gantt',
    disabled: true
  },
  {
    name: 'Projects.DocumentsStore',
    title: 'Files',
    url: '/home/documents-store'
  }
];


export const ProjectManagementViews: View[] = [
  {
    name: 'Project.Activities',
    title: 'Activities List',
    url: '/contract-management/activities'
  },
  {
    name: 'Project.Gantt',
    title: 'Gantt chart',
    url: '/contract-management/gantt'
  },
  {
    name: 'Project.Timelines',
    title: 'Timelines',
    url: '/contract-management/timelines'
  },
  {
    name: 'Project.Documents',
    title: 'Documents',
    url: '/contract-management/documents'
  }
];


export const ProcessManagementViews: View[] = [
  {
    name: 'Process.Tree',
    title: 'Obligations Tree',
    url: '/regulatory-processes/obligations-tree'
  },
  {
    name: 'Process.Diagram',
    title: 'Process diagram',
    url: '/regulatory-processes/process-diagram'
  },
  {
    name: 'Process.Documentation',
    title: 'Process documentation',
    menuTitle: 'Documentation',
    url: '/regulatory-processes/documentation'
  }
];


export const LibraryViews: View[] = [
  {
    name: 'Library.Contracts',
    title: 'Contract Models',
    url: '/library/oil-and-gas-contract-models'
  },
  {
    name: 'Library.Documents',
    title: 'Regulatory Documents',
    url: '/library/regulatory-documents'
  },
  {
    name: 'Library.Procedures',
    title: 'Procedures',
    url: '/library/procedures'
  },
  {
    name: 'Library.Guidance',
    title: 'Talanza Guidance',
    url: '/library/talanza-guidance'
  }
];


export const SearchViews: View[] = [
  {
    name: 'Search.Main',
    title: 'Search Results',
    url: '/search/main'
  },
];
