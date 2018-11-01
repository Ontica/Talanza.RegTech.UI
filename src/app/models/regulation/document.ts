/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

export interface Document {
  readonly uid: string;
  readonly type: string;
  readonly name: string;
  readonly code: string;
  readonly url: string;
}

export class DocumentFilter {

  public type = "";
  public keywords = "";

  public get isEmpty(): boolean {
    if (this.type || this.keywords) {
      return false;
    }
    return true;
  }

  public toQueryString(): string {
    if (!this.isEmpty) {
      return `type=${this.type}&keywords=${this.keywords}`;
    } else {
      return "";
    }
  }

}
