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
         LibraryViews,
         SearchViews} from './views.config';


export type LayoutType = 'Home' | 'Projects' | 'Steps'| 'Processes' | 'Library' | 'Search';


export const APP_VIEWS: View[] = HomePageViews.concat(ProjectManagementViews,
                                                      StepsViews,
                                                      ProcessManagementViews,
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
    hint: 'Regulatory processes',
    defaultTitle: 'Processes list'
  },
  {
    name: 'Processes',
    views: ProcessManagementViews,
    hint: 'Regulatory processes',
    defaultTitle: 'Please select a process'
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
