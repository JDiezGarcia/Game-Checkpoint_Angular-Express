import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Game, GameListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class GamesService {
  constructor(
    private apiService: ApiService
  ) { }

  query(config: GameListConfig): Observable<{ games: Game[], gameCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    return this.apiService
      .get(
        '/games' + ((config.type === 'feed') ? '/feed' : ''),
        new HttpParams({ fromObject: params })
      );
  }

  get(slug): Observable<Game> {
    return this.apiService.get(slug)
      .pipe(map(data => data.game));
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
