import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { GamesService, Game, GameFilters } from '../../core';
@Component({
    selector: 'app-search-bar',
    styleUrls: ['search-bar.component.css'],
    templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
    constructor(private gamesService: GamesService, private router: Router) { }
    @ViewChild('query') query!: ElementRef;
    noQuery: Boolean = true;
    noMatch: Boolean = true;
    searchGames!: Game[];
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
                    this.noMatch = false;
                    console.log('entro');
                    this.searchGames = data.games;
                } else {
                    this.noMatch = true;
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

    removeItems() {
        this.noQuery = true;
        this.noMatch = true;
        this.query.nativeElement.value = '';
    }
}
