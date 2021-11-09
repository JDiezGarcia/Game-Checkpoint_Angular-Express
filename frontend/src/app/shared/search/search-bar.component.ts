import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { GamesService, Game, GameFilters, Thumbnail, ProfilesService } from '../../core';
@Component({
    selector: 'app-search-bar',
    styleUrls: ['search-bar.component.css'],
    templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
    constructor(
        private gamesService: GamesService,
        private router: Router,
        private profileService: ProfilesService
    ) { }
    @ViewChild('query') query!: ElementRef;
    noQuery: Boolean = true;
    noMatchG: Boolean = true;
    noMatchU: Boolean = true;
    searchGames: Game[] = [];
    searchUsers: Thumbnail[] = [];
    filters: GameFilters = {
        limit: 5,
        offset: 0,
    };

    searchItems(query: string) {
        this.filters.query = query;
        if (query.length > 0) {
            this.gamesService.query(this.filters).subscribe((data) => {
                this.noQuery = false;
                if (data.gamesCount > 0) {
                    this.noMatchG = false;
                    this.searchGames = data.games;
                    console.log(data.games)
                }else{
                    this.noMatchG = true;
                }
            });
            this.profileService.searchUsers(query, 3).subscribe((data) => {
                console.log(data);
                if (data.length > 0) {
                    this.noMatchU = false;
                    this.searchUsers = data;
                }else{
                    this.noMatchU = true;
                }
            });
        } else {
            this.noQuery = true;
        }
    }

    redirectGames(query: string) {
        if (!query) {
            this.router.navigate(['/games']);
            this.removeItems();
        } else {
            this.router.navigate(['/games'], { queryParams: { query: query } });
            this.removeItems();
        }
    }
    redirectDetails(slug: String) {
        this.router.navigate(['/details', slug]);
        this.removeItems();
    }

    redirectProfile(user: String) {
        this.router.navigate(['/profile', user]);
        this.removeItems();
    }

    removeItems() {
        this.noQuery = true;
        this.noMatchU = true;
        this.noMatchG = true;
        this.query.nativeElement.value = '';
    }
}
