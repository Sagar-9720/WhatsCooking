import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorseRecipeComponent } from './endorse-recipe.component';

describe('EndorseRecipeComponent', () => {
  let component: EndorseRecipeComponent;
  let fixture: ComponentFixture<EndorseRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndorseRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndorseRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
