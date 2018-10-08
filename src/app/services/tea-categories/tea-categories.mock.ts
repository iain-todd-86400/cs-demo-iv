import { of } from 'rxjs';

export function createTeaCategoriesServiceMock() {
  return jasmine.createSpyObj('TeaCategoriesService', {
    getAll: of([])
  });
}
