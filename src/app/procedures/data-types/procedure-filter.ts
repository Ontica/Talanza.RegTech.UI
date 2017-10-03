import { Entity } from './entity';
import { Authority } from './authority';

export class ProcedureFilter {

  public officeUID: string;
  public entityUID: string;
  public theme: string;
  public stage: string;
  public contract: string;
  public keywords: string;

  constructor() {
    this.clean();
  }

  public clean(): void {
    this.officeUID = '';
    this.entityUID = '';
    this.theme = '';
    this.stage = '';
    this.contract = '';
    this.keywords = '';
  }

  public toString(): string {
    let filter = '';

    if ((this.entityUID !== '')) {
      filter = this.addFilterConnector(filter) + "AuthEntityUID='" + this.entityUID + "'";
    }
    if ((this.officeUID !== '')) {
      filter = this.addFilterConnector(filter) + "AuthOfficeUID='" + this.officeUID + "'";
    }
    if ((this.theme !== '')) {
      filter = this.addFilterConnector(filter) + "theme='" + this.theme + "'";
    }
    // if ((this.filter.stage !== '')) {
    //   filter = this.addFilterConnector(filter) + "stage='" + this.filter.stage + "'";
    // }
    return filter;
  }

  private addFilterConnector(filter: string): string {
    if (filter !== '') {
      filter += ' AND ';
    }
    return filter;
  }

}
