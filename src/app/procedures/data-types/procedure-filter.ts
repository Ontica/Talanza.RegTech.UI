import { Entity } from './entity';
import { Authority } from './authority';

export class ProcedureFilter {
  public officeUID: string;
  public entityUID: string;
  public theme: string;
  public stage: string;

  constructor() {
    this.clean();
  }

  public clean(): void {
    this.officeUID = '';
    this.entityUID = '';
    this.theme = '';
    this.stage = '';
  }

}
