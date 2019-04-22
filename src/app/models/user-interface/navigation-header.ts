/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { MenuItem } from './menu-item';


export interface NavigationHeader {
  title: string;
  hint: string;
  mainMenu: MenuItem[];
}


export const DefaultNavigationHeader: NavigationHeader = {
  title: '',
  hint: '',
  mainMenu: []
};
