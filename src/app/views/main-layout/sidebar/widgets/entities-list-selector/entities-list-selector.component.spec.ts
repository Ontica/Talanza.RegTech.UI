import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesListSelectorComponent } from './entities-list-selector.component';

describe('EntitiesListSelectorComponent', () => {
  let component: EntitiesListSelectorComponent;
  let fixture: ComponentFixture<EntitiesListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesListSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
