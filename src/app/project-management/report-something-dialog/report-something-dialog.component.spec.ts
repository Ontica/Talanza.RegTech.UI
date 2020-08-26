import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSomethingDialogComponent } from './report-something-dialog.component';

describe('ReportSomethingDialogComponent', () => {
  let component: ReportSomethingDialogComponent;
  let fixture: ComponentFixture<ReportSomethingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSomethingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSomethingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
