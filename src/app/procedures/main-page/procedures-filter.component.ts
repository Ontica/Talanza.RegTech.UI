/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Procedure } from '../data-types/procedure';
import { Entity } from '../data-types/entity';
import { Authority } from '../data-types/authority';
import { ProcedureFilter } from '../data-types/procedure-filter';

import { ProcedureService } from '../services/procedure.service';
import { AuthorityService } from '../services/authority.service';

@Component({
  selector: 'procedure-filter',
  templateUrl: './procedures-filter.component.html',
  styleUrls: ['./procedures-filter.component.scss'],
  providers: [ProcedureService, AuthorityService]
})

export class ProcedureFilterComponent {
  public filter: ProcedureFilter = new ProcedureFilter();

  public authorities: Authority[] = [];
  public entities: Entity[] = [];

  @Output() public onSearch = new EventEmitter<Procedure[]>();

  constructor(private procedureService: ProcedureService, private authorityService: AuthorityService) { }

  public ngOnInit() {
    this.setEntities();
  }

  public onChangeSelectedEntity(entityUID: string): void {
    this.setAutorities(entityUID);
    this.filter.entity = entityUID;
  }
  public onChangeSelectedTheme(theme: string): void {
    this.filter.theme = theme;
  }

  public onChangeSelectedStage(stage: string): void {
    this.filter.stage = stage;
  }

  public onChangeAuthority(authority: string): void {
    this.filter.authority = authority;
  }

  public cleanCombos(): void {
    this.filter.clean();

    this.onSearch.emit([]);

  }

  public search(): void {
    if ((this.filter.entity === '') && (this.filter.theme === '') && (this.filter.stage === '')) {
      this.setAllprocedures();
    } else {
      let filter = this.getFilter();
      this.setProcedures(filter);
    }
  }

  private getFilter(): string {
    let filter = '';
    if ((this.filter.entity !== '')) {
      filter = this.addFilterConnector(filter) + "entity='" + this.filter.entity + "'";
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

  private setAutorities(entityUID: string): void {
    this.authorityService.getAuthorities(entityUID).then((entity) => {
      this.authorities = entity.authorities;
    });
    this.filter.authority = '';
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
