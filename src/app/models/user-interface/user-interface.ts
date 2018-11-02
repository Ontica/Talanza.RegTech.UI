/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface ColoredTag extends ISelectable {
  name: string,
  color: string,
}


export interface ISelectable {
  selected: boolean;
}


export interface Displayable {
  show(): void;
  hide(): void;
}
