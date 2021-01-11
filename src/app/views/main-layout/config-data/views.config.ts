/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View } from "../common-models";


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

export const StepsViews: View[] = [
  {
    name: 'Steps.ProcessesList',
    title: 'Processes',
    url: '/steps/processes'
  },
  {
    name: 'Steps.ActivitiesList',
    title: 'Activities',
    url: '/steps/activities'
  },
  {
    name: 'Steps.EventsList',
    title: 'Events',
    url: '/steps/events'
  },
  {
    name: 'Steps.All',
    title: 'Search all',
    url: '/steps/all'
  },
  {
    name: 'Steps.Documentation',
    title: 'Documentation',
    url: '/steps/documentation'
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


export const DashboardViews: View[] = [
  {
    name: 'Dashboard.Main',
    title: 'Main',
    url: '/dashboard/main'
  },
  {
    name: 'Dashboard.Compliance',
    title: 'Compliance',
    url: '/dashboard/compliance'
  },
  {
    name: 'Dashboard.Financial',
    title: 'Financial',
    url: '/dashboard/financial'
  },
  {
    name: 'Dashboard.Operations',
    title: 'Operations',
    url: '/dashboard/operations'
  },
  {
    name: 'Dashboard.Engineering',
    title: 'Engineering',
    url: '/dashboard/engineering'
  }
];

export const DataViews: View[] = [
  {
    name: 'Data.Presupuestos',
    title: 'Presupuestos y costos',
    url: '/data/main'
  },
  {
    name: 'Data.FMP',
    title: 'FMP',
    url: '/data/fmp'
  },
  {
    name: 'Data.CNIH',
    title: 'CNIH',
    url: '/data/cnih'
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
