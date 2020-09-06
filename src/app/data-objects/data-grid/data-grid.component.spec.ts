/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridComponent } from './data-grid.component';


describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
