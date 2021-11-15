import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import {  RolesGuardService } from '../services/roles-guard.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(
    private rolesGuardService: RolesGuardService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.rolesGuardService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      this.router.navigate(['/']);
    }

    return isAuthorized;
  }
}
