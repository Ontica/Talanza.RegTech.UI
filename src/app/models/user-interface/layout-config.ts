/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View, Layout } from './user-interface';

import { HomePageViews,
         ProjectManagementViews,
         StepsViews,
         ProcessManagementViews,
         DashboardViews,
         DataViews,
         LibraryViews,
         SearchViews} from './views.config';


export type LayoutType = 'Home' | 'Projects' | 'Steps'| 'Processes' | 'Dashboard' | 'Data' | 'Library' | 'Search';


export const APP_VIEWS: View[] = HomePageViews.concat(ProjectManagementViews,
                                                      StepsViews,
                                                      ProcessManagementViews,
                                                      DashboardViews,
                                                      DataViews,
                                                      LibraryViews,
                                                      SearchViews);

export const APP_LAYOUTS: Layout[] = [
  {
    name: 'Home',
    views: HomePageViews,
    hint: 'Home page',
    defaultTitle: 'Home page'
  },
  {
    name: 'Projects',
    views: ProjectManagementViews,
    hint: 'Contract management',
    defaultTitle: 'Please select a contract'
  },
  {
    name: 'Steps',
    views: StepsViews,
    hint: 'Processes, activities and events definition',
    defaultTitle: 'Steps definition'
  },
  {
    name: 'Processes',
    views: ProcessManagementViews,
    hint: 'Regulatory processes',
    defaultTitle: 'Please select a process'
  },
  {
    name: 'Dashboard',
    views: DashboardViews,
    hint: 'Dashboard',
    defaultTitle: 'Dashboards'
  },
  {
    name: 'Data',
    views: DataViews,
    hint: 'Data',
    defaultTitle: 'Data'
  },
  {
    name: 'Library',
    views: LibraryViews,
    hint: 'Knowledge base and Regulations Library',
    defaultTitle: 'Library main page'
  },
  {
    name: 'Search',
    views: SearchViews,
    hint: '',
    defaultTitle: 'Search results'
  }
];
