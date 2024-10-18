import { TestBed } from '@angular/core/testing';

import { IngredientserviceService } from './ingredientservice.service';

describe('IngredientserviceService', () => {
  let service: IngredientserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
