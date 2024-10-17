import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyrecipeComponent } from './modifyrecipe.component';

describe('ModifyrecipeComponent', () => {
  let component: ModifyrecipeComponent;
  let fixture: ComponentFixture<ModifyrecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyrecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyrecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
