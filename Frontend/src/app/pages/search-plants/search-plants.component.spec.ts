import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlantsComponent } from './search-plants.component';

describe('SearchPlantsComponent', () => {
  let component: SearchPlantsComponent;
  let fixture: ComponentFixture<SearchPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPlantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
