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
  // {
  //   name: 'Projects.Gantt',
  //   title: 'Gantt chart',
  //   url: '/home/gantt'
  // },
  {
    name: 'Projects.Files',
    title: 'Files',
    url: '/home/files'
  }
];


export const ProjectManagementViews: View[] = [
  {
    name: 'Project.Activities',
    title: 'Activities Tree',
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
    name: 'Project.Files',
    title: 'Files',
    url: '/contract-management/files'
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
