import { Component, Input, OnInit } from '@angular/core';

import { ContractService } from '../../services/contract.service';
import { RelatedProcedures, SmallClause } from '../../data-types/clause';

import { Entity } from '../../../procedures/data-types/entity';
import { SmallProcedureInterface } from '../../../procedures/data-types/small-procedure.interface';
import { AuthorityService } from '../../../procedures/services/authority.service';
import { ProcedureService } from '../../../procedures/services/procedure.service';

@Component({
  selector: 'related-procedures-tab',
  templateUrl: './related-procedures-tab.component.html',
  styleUrls: ['./related-procedures-tab.component.scss'],
  providers: [AuthorityService, ProcedureService]
})

export class RelatedProceduresTabComponent implements OnInit {

  @Input() public clauseInfo: SmallClause;

  public relatedProcedures: RelatedProcedures[];
  public entities: Entity[] = [];
  public procedures: SmallProcedureInterface[] = [];
  public relatedProcedure = new RelatedProcedures();
  public isDiabledMaxFilingTerm = true;
  public isVisibleAddProcedureEditor = false;

  private entityUID = '';
  private procedureUID = '';

  constructor(private contractService: ContractService, private authorityService: AuthorityService,
              private procedureService: ProcedureService) { }

  public ngOnInit() {
    this.setRelatedProcedures();
    this.setEntities();
  }

  public onShowAddProcedureEditor(): void {
    this.isVisibleAddProcedureEditor = true;
  }

  public onChangeEntity(entityUID: string): void {
    if (entityUID !== '') {
      this.setProcedures(entityUID);
    }
    this.entityUID = entityUID;
  }

  public onChangeProcedure(procedureUID: string): void {
    if (procedureUID !== '') {
      this.relatedProcedure.procedure.uid = procedureUID;
    }
    this.procedureUID = procedureUID;
  }

  public onChangeMaxFilingTermType(): void {
    if ((this.relatedProcedure.maxFilingTermType !== 'No determinado')
      && (this.relatedProcedure.maxFilingTermType !== 'No aplica')) {
      this.isDiabledMaxFilingTerm = false;
    } else {
      this.isDiabledMaxFilingTerm = true;
    }

  }

  public cancelAddProcedure(): void {
    this.isVisibleAddProcedureEditor = false;
  }

  public async addRelatedProcedure() {
    if (!this.validate()) {
      return;
    }
    try {
      await this.contractService.addRelatedProcedure(
        this.clauseInfo.contractUID, this.clauseInfo.uid, this.relatedProcedure);
      alert('El trámite se ha agregado a la claúsula.');
      this.relatedProcedure = new RelatedProcedures();
      await this.setRelatedProcedures();
      this.entityUID = '';
      this.procedureUID = '';
      this.isVisibleAddProcedureEditor = false;
    } catch (e) {
      alert(e);
    }
  }

  public async setRelatedProcedures() {
    let clause = await this.contractService.getClause(this.clauseInfo.contractUID, this.clauseInfo.uid);
    this.relatedProcedures = clause.relatedProcedures;
  }

  private setEntities(): void {
    this.authorityService.getEntities()
      .then((entities) => { this.entities = entities; });
  }

  private setProcedures(entityUID: string): void {
    this.procedureService.getProceduresList("AuthEntityUID='" + entityUID + "'")
      .then((procedures) => { this.procedures = procedures; });
  }

  private validate(): boolean {
    if (this.entityUID === '') {
      alert('Seleccionar una etapa de la lista.');
      return false;
    }
    if (this.procedureUID === '') {
      alert('Seleccionar un trámite de la lista.');
      return false;
    }
    if (this.relatedProcedure.maxFilingTermType === '') {
      alert('Selecionar un plazo de la lista.');
      return false;
    }
    if ((!this.relatedProcedure.maxFilingTerm) &&
      ((this.relatedProcedure.maxFilingTermType !== 'No determinado') &&
        (this.relatedProcedure.maxFilingTermType !== 'No aplica'))) {

      alert('La cantidad de: ' + this.relatedProcedure.maxFilingTermType + ' se encuntra en blanco.');
      return false;
    }
    if (this.relatedProcedure.startsWhen === '') {
      alert('Seleccinar la condición de inicio de la lista.');
      return false;
    }
    if (this.relatedProcedure.startsWhenTrigger === '') {
      alert('seleccionar la actividad o evento de la lista');
      return false;
    }

    return true;
  }
}
