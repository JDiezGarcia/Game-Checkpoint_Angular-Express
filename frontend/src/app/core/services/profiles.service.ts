import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile, Game } from '../models';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService
  ) {}

  get(user: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + user)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

  follow(user: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + user + '/follow');
  }

  query(user: string, type: string): Observable<{ 
    games: Game[]; 
    gamesCounts: {
      playing: number,
      pending: number,
      finished: number,
    } }> {
    return this.apiService.get('/profiles/' + user + '/games', new HttpParams({ fromObject: {type: type }}))
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
