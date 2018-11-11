/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


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
