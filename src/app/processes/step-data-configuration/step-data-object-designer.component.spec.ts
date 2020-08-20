import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDataObjectDesignerComponent } from './step-data-object-designer.component';

describe('StepDataObjectDesignerComponent', () => {
  let component: StepDataObjectDesignerComponent;
  let fixture: ComponentFixture<StepDataObjectDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDataObjectDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDataObjectDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
