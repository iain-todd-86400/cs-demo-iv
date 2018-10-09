import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TeaCategory } from '../../models/tea-category';

@Injectable({
  providedIn: 'root'
})
export class TeaCategoriesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<TeaCategory>> {
    return this.http.get<Array<TeaCategory>>(
      `${environment.dataService}/protected/tea-categories`
    );
  }
}
