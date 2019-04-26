/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export type VALUE_SELECTOR =
    'Sidebar.Selected.Projects' |
    'Sidebar.Selected.Responsibles' |
    'Sidebar.Selected.Themes';


export function getValueSelectorDefaultValue(selector: VALUE_SELECTOR): any {
  switch (selector) {
    case 'Sidebar.Selected.Projects':
    case 'Sidebar.Selected.Responsibles':
    case 'Sidebar.Selected.Themes':
      return [];
    default:
      return {};
  }
}
