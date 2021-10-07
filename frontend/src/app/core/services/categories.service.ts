import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoriesService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<String[]> {
    return this.apiService.get('/categories').pipe(
      map((data) => {
        return data.categories;
      })
    );
  }

}
