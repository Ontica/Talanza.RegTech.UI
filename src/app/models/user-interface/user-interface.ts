/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Layout {
  name: string;
  views: View[];
  hint: string;
  defaultTitle: string;
}


export interface View {
  name: string;
  title: string;
  url: string;
  menuTitle?: string;
  disabled?: boolean;
}


export const DefaultView: View = {
  name: 'Default view',
  title: 'Default view',
  url: '/',
};


export interface ISelectable {
  selected: boolean;
}


export interface Displayable {
  show(): void;
  hide(): void;
}


// card settings

export class CardSettings {
  showTitle = true;
  flat = false;
  readonly = false;
}


// colored tag

export interface ColoredTag extends ISelectable {
  name: string;
  color: string;
}
