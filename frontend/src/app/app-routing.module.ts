import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, RolesGuard } from './core';
import { NoAuthGuard } from './auth/no-auth-guard.service';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./user-page/user-page.module').then((m) => m.UserPageModule),
    },
    {
        path: 'games',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./games/games.module').then((m) => m.GamesModule),
    },
    {
        path: 'details',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./details/details.module').then((m) => m.DetailsModule),
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'moderator',
        canActivate: [AuthGuard, RolesGuard],
        data: {
            allowedRoles: ['admin', 'moderator']
        },
        loadChildren: () => import('./moderator/moderator.module').then(m => m.ModeratorModule)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy'
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
