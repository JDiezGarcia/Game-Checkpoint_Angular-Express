import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Details, GamesService } from '../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DetailsResolver implements Resolve<Details> {
  constructor(
    private gamesService: GamesService,
    private router: Router
  ) {}

  resolve(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
      return this.gamesService.get(router.params['slug'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
