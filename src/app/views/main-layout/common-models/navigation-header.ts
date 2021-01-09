/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Layout } from './common';
import { MenuItem, createMenuItemForView } from './menu-item';


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


export function buildNavigationHeader(layout: Layout, title?: string): NavigationHeader {
  const navHeader: NavigationHeader = {
    title: title || layout.defaultTitle,
    hint: layout.hint,
    mainMenu: []
  };

  for (const view of layout.views) {
    const menuItem = createMenuItemForView(view);

    navHeader.mainMenu.push(menuItem);
  }

  return navHeader;
}
