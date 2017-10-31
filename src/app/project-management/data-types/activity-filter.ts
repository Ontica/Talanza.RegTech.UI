export class ActivityFilter {
  public contract: string;
  public project: string;
  public stage: string;
  public tags: string[];
  public responsible: string;
  public keywords: string;
  public orderBy: string;

  constructor()  {
    this.clean();
  }

  public clean(): void {
    this.contract= '';
    this.project = '';
    this.stage = '';
    this.tags = [];
    this.responsible = '';
    this.keywords = '';
    this.orderBy = '';
  }

  public clone(): ActivityFilter {
    let clone = new ActivityFilter();

    clone.contract = this.contract;
    clone.project = this.project;
    clone.stage = this.stage;
    clone.tags = this.tags;
    clone.responsible = this.responsible;
    clone.keywords = this.keywords;
    clone.orderBy = this.orderBy;
    
    return clone;
  }
  
  public toString(): string {
    let filter = '';

    if ((this.contract !== '')) {
      filter = this.addFilterConnector(filter) + "contract=" + this.contract;
    }
    if ((this.project !== '')) {
      filter = this.addFilterConnector(filter) + "project=" + this.project;
    }
    if ((this.stage !== '')) {
      filter = this.addFilterConnector(filter) + "stage=" + this.stage;
    }
    if ((this.tags.length !== 0)) {     
      this.tags.forEach((x) => { 
        filter = this.addFilterConnector(filter) + "tag=" + x;
      })
    }
    if (this.responsible !== '') {
      filter = this.addFilterConnector(filter) + "responsible=" + this.responsible;
    }
    if (this.keywords !== '') {
      filter = this.addFilterConnector(filter) + "keywords=" + this.keywords;
    }
    if (this.orderBy !== '') {
      filter = this.addFilterConnector(filter) + "orderBy=" + this.orderBy;
    }
    return filter;
  }
 
  private addFilterConnector(filter: string): string {
    if (filter !== '') {
      filter += '&';
    }
    return filter;
  }


}