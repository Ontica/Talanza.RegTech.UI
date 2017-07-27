import { Component, Input, OnInit } from '@angular/core';

import { ContractService } from '../../services/contract.service';
import { ContractClause, RelatedProcedures } from '../../data-types/contract';

import { Entity } from '../../../procedures/data-types/entity';
import { SmallProcedureInterface } from '../../../procedures/data-types/small-procedure.interface';
import { KeyValue } from '../../../core/core-data-types';

import { AuthorityService } from '../../../procedures/services/authority.service';
import { ProcedureService } from '../../../procedures/services/procedure.service';
import { CataloguesService } from '../../../common-services';

@Component({
  selector: 'related-procedures-tab',
  templateUrl: './related-procedures-tab.component.html',
  styleUrls: ['./related-procedures-tab.component.scss'],
  providers: [AuthorityService, ProcedureService, CataloguesService]
})

export class RelatedProceduresTabComponent implements OnInit {

  @Input() public contractClause: ContractClause;

  public relatedProcedures: RelatedProcedures[];
  public entities: Entity[] = [];
  public procedures: SmallProcedureInterface[] = [];
  public timeValueTypesList: KeyValue[] = [];

  public relatedProcedure = new RelatedProcedures();
  public isDiabledMaxFilingTerm = true;
  public isVisibleAddProcedureEditor = false;

  private entityUID = '';
  private procedureUID = '';

  constructor(private contractService: ContractService,
              private authorityService: AuthorityService,
              private procedureService: ProcedureService,
              private cataloguesService: CataloguesService) { }

  public ngOnInit() {
    this.updateRelatedProceduresGrid();
    this.setEntities();
    this.loadTimeValueTypesList();
    this.clean();
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
      await this.contractService.addRelatedProcedure(this.contractClause.contractUID,
                                                     this.contractClause.uid,
                                                     this.relatedProcedure);
      alert('El trámite se ha agregado a la claúsula.');

      await this.updateRelatedProceduresGrid();
      this.clean();
      this.isVisibleAddProcedureEditor = false;
    } catch (e) {
      alert(e);
    }
  }

  public async updateRelatedProceduresGrid() {
    let clause = await this.contractService.getClause(this.contractClause.contractUID, this.contractClause.uid);
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

  private loadTimeValueTypesList(): void {
    try {
      this.cataloguesService.getTimeValueTypesList()
                            .then((list) => { this.timeValueTypesList = list; });
    } catch (e) {
      alert(e);
    }
  }

  private validate(): boolean {
    if (this.entityUID === '') {
      alert('Seleccionar una entidad de la lista.');
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

  private clean(): void {
    this.entityUID = '';
    this.procedureUID = '';
    this.relatedProcedure = new RelatedProcedures();
  }

}
