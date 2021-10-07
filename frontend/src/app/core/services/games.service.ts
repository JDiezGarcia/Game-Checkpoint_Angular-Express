import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Game, GameFilters } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class GamesService {
  constructor(private apiService: ApiService) {}

  query(config: GameFilters): Observable<{ games: Game[]; gameCount: number }> {
    return this.apiService
      .get('/games', new HttpParams({ fromObject: config as any }))
      .pipe(
        map((data) => {
          console.log(data);
          return data;
        })
      );
  }

  get(slug: string): Observable<Game> {
    return this.apiService.get('/details/' + slug).pipe(
      map((data) => {
        return data.games;
      })
    );
  }

  // destroy(slug) {
  //   return this.apiService.delete('/articles/' + slug);
  // }

  // save(game): Observable<Game> {
  //   // If we're updating an existing game
  //   if (game.slug) {
  //     return this.apiService.put('/articles/' + game.slug, {game: game})
  //       .pipe(map(data => data.game));

  //   // Otherwise, create a new game
  //   } else {
  //     return this.apiService.post('/articles/', {game: game})
  //       .pipe(map(data => data.game));
  //   }
  // }

  // favorite(slug): Observable<Game> {
  //   return this.apiService.post('/articles/' + slug + '/favorite');
  // }

  // unfavorite(slug): Observable<Game> {
  //   return this.apiService.delete('/articles/' + slug + '/favorite');
  // }
}
