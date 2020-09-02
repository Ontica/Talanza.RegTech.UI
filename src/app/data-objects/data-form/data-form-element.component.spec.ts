import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormElementComponent } from './data-form-element.component';

describe('DataFormElementComponent', () => {
  let component: DataFormElementComponent;
  let fixture: ComponentFixture<DataFormElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFormElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
