import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Details, Game, GameFilters } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class GamesService {
    constructor(private apiService: ApiService) { }

    query(config: GameFilters): Observable<{ games: Game[]; gamesCount: number }> {
        return this.apiService
            .get('/games', new HttpParams({ fromObject: config as any }))
            .pipe(
                map((data) => {
                    return data;
                })
            );
    }

    get(slug: string): Observable<Details> {
        return this.apiService.get('/details/' + slug).pipe(
            map((data) => {
                return data.games;
            })
        );
    }

    gameFollow(slug: string, status: string ): Observable<Game> {
        return this.apiService.post('/' + slug + '/follow', {status: status});
    }
    gameUnfollow(slug: string): Observable<Game> {
        return this.apiService.delete('/' + slug + '/follow');
    }
    gameFavorite(slug: string): Observable<Game> {
        return this.apiService.post('/' + slug + '/favorite');
    }
    gameUnfavorite(slug: string): Observable<Game> {
        return this.apiService.delete('/' + slug + '/favorite');
    }
    gameChangeStatus(slug: string, status: string): Observable<Game>{
        return this.apiService.put('/' + slug + '/changeStatus', {newStatus: status})
    }

    gameVote(slug: string, rate: number): Observable<Game>{
        return this.apiService.post('/' + slug + '/rating', {rate: rate})
    }
    gameChangeVote(slug: string, rate: number): Observable<Game> {
        return this.apiService.put('/' + slug + '/rating', { rate: rate })
    }
    gameUnvote(slug: string): Observable<Game> {
        return this.apiService.delete('/' + slug + '/rating')
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
}
