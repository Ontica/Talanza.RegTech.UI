export class Clause {
  public uid: string;
  public clauseNo: string;
  public title: string;
  public text: string;
  public surcePageNo: number;

  constructor() {
    this.uid = '';
    this.clauseNo = '';
    this.title = '';
    this.text = '';
    this.surcePageNo = 0;
  }
}
