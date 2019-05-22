/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export type VALUE_SELECTOR = 'Sidebar.ProjectFilter';


export function getValueSelectorDefaultValue(selector: VALUE_SELECTOR): any {
  switch (selector) {
    // case 'Sidebar.ProjectsArray':
    //   return [];
    default:
      return {};
  }
}
