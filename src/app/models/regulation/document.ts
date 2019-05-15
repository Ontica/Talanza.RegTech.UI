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
  readonly authority: string;
  readonly stage: string;
  readonly version: string;
  readonly lastUpdated: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly url: string;
  readonly officialUrl: string;
}

export class DocumentFilter {

  type = '';
  keywords = '';

  get isEmpty(): boolean {
    if (this.type || this.keywords) {
      return false;
    }
    return true;
  }

  toQueryString(): string {
    if (!this.isEmpty) {
      return `type=${this.type}&keywords=${this.keywords}`;
    } else {
      return '';
    }
  }

}
