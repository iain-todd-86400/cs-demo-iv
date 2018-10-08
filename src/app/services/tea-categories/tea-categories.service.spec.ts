import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TeaCategory } from '../../models/tea-category';
import { TeaCategoriesService } from './tea-categories.service';

import { deepCopy } from '../../../../test/util';
import { environment } from '../../../environments/environment';
import { testTeaCategories } from './tea-categories.test-data';

describe('TeaCategoriesService', () => {
  let httpTestingController: HttpTestingController;
  let teaCategoriesService: TeaCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeaCategoriesService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([TeaCategoriesService], (service: TeaCategoriesService) => {
    teaCategoriesService = service;
  }));

  it('should exists', () => {
    expect(teaCategoriesService).toBeTruthy();
  });

  describe('get all', () => {
    let categories: Array<TeaCategory>;
    beforeEach(() => {
      categories = deepCopy(testTeaCategories);
    });

    it('gets all of the car classes', () => {
      teaCategoriesService.getAll().subscribe(c => expect(c).toEqual(testTeaCategories));
      const req = httpTestingController.expectOne(`${environment.dataService}/tea-categories`);
      expect(req.request.method).toEqual('GET');
      req.flush(categories);
      httpTestingController.verify();
    });
  });
});
