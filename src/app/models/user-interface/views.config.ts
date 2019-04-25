/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View } from './user-interface';


export const HomePageViews: View[] = [
  {
    name: 'Home.PendingTasks',
    title: 'Pending Tasks',
    url: '/home/pending-tasks'
  },
  {
    name: 'Home.TasksFinder',
    title: 'Tasks Finder',
    url: '/home/tasks-finder'
  },
  {
    name: 'Home.OverallTimelines',
    title: 'Overall Timelines',
    url: '/home/overall-timelines'
  },
  {
    name: 'Home.DocumentsStore',
    title: 'Documents Store',
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
    name: 'Library.Main',
    title: 'Library Main Page',
    url: '/library'
  },
];


export const SearchViews: View[] = [
  {
    name: 'Search.Main',
    title: 'Search Results',
    url: '/library'
  },
];

