import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { GameFilters } from '../models';

@Injectable()
export class CategoriesService {
  constructor(private apiService: ApiService) {}

  getAll(config?: GameFilters): Observable<Category[]> {
    return this.apiService.get('/categories', new HttpParams({ fromObject: config as any })).pipe(
      map((data) => {
        return data.categories;
      })
    );
  }

}
