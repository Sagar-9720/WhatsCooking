import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRecipeComponent } from './view-all-recipe.component';

describe('ViewAllRecipeComponent', () => {
  let component: ViewAllRecipeComponent;
  let fixture: ComponentFixture<ViewAllRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
