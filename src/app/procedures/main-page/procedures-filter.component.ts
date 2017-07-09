/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SmallProcedureInterface } from '../data-types/small-procedure.interface';
import { Entity } from '../data-types/entity';
import { Office } from '../data-types/office';
import { ProcedureFilter } from '../data-types/procedure-filter';

import { ProcedureService } from '../services/procedure.service';
import { AuthorityService } from '../services/authority.service';

@Component({
  selector: 'procedure-filter',
  templateUrl: './procedures-filter.component.html',
  styleUrls: ['./procedures-filter.component.scss'],
  providers: [ProcedureService, AuthorityService]
})

export class ProcedureFilterComponent implements OnInit {
  public filter: ProcedureFilter = new ProcedureFilter();

  public offices: Office[] = [];
  public entities: Entity[] = [];

  @Output() public onSearch = new EventEmitter<SmallProcedureInterface[]>();
  @Output() public onNewProcedure = new EventEmitter<string>();

  constructor(private procedureService: ProcedureService, private authorityService: AuthorityService) { }

  public ngOnInit() {
    this.setEntities();
  }

  public async onChangeSelectedEntity(entityUID: string) {
    this.filter.entityUID = entityUID;
    await this.setOffices(entityUID);

  }
  public onChangeSelectedTheme(theme: string): void {
    this.filter.theme = theme;
  }

  public onChangeSelectedStage(stage: string): void {
    this.filter.stage = stage;
  }

  public onChangeAuthority(officeUID: string): void {
    this.filter.officeUID = officeUID;
  }

  public newProcedure(): void {
    this.onNewProcedure.emit('');
  }

  public cleanCombos(): void {
    this.filter.clean();
    this.onSearch.emit([]);
  }

  public search(): void {
    if ((this.filter.entityUID === '') && (this.filter.officeUID === '')
      && (this.filter.theme === '') && (this.filter.stage === '')) {
      this.setAllprocedures();
    } else {
      let filter = this.getFilter();
      this.setProcedures(filter);
    }
  }

  private getFilter(): string {
    let filter = '';
    if ((this.filter.entityUID !== '')) {
      filter = this.addFilterConnector(filter) + "AuthEntityUID='" + this.filter.entityUID + "'";
    }
    if ((this.filter.officeUID !== '')) {
      filter = this.addFilterConnector(filter) + "AuthOfficeUID='" + this.filter.officeUID + "'";
    }
    if ((this.filter.theme !== '')) {
      filter = this.addFilterConnector(filter) + "theme='" + this.filter.theme + "'";
    }
    if ((this.filter.stage !== '')) {
      filter = this.addFilterConnector(filter) + "stage='" + this.filter.stage + "'";
    }
    return filter;
  }

  private addFilterConnector(filter: string): string {
    if (filter !== '') {
      filter += ' AND ';
    }
    return filter;
  }

  private async setOffices(entityUID: string) {
    await this.authorityService.getEntity(entityUID).then((entity) => {
      this.offices = entity.offices;
    });
    this.filter.officeUID = '';
  }

  private setEntities(): void {
    this.authorityService.getEntities().then((entities) => {
      this.entities = entities;

    });
  }

  private setAllprocedures(): void {
    this.procedureService.getProocedures().then((procedures) => {
      this.onSearch.emit(procedures);
    });
  }

  private setProcedures(filter: string): void {
    this.procedureService.getFilterProocedures(filter).then((procedures) => {
      this.onSearch.emit(procedures);
    });
  }

}
