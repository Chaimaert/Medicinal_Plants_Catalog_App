import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDetailsComponent } from './plant-detail.component';

describe('PlantDetailComponent', () => {
  let component: PlantDetailsComponent;
  let fixture: ComponentFixture<PlantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
