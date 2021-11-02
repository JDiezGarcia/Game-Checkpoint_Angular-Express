import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameFilters, GameListConfig } from '../core';
@Component({
  selector: 'app-games-page',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  listConfig!: GameListConfig;
  filterConfig!: GameFilters;

  totalPages!: number;

  setTotalGame(total: number) {
    this.totalPages = Math.ceil(total / this.listConfig.filters.limit);
  }

  //--[TO ADD THE NEW PAGE TO PARAMS]--\\
  setNewPage(actualPage: number) {
    let page: Params = { page: actualPage }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: page,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  handleFilters(actualFilter: string) {
    let newFilters: Object = {};
    let remove: Boolean = false;
    let oldFilters: string[] = [...this.route.snapshot.queryParamMap.getAll('categories')];
    
    if (oldFilters.length > 0) {
      for (let i = 0; i < oldFilters.length; i++) {
        if (oldFilters[i] === actualFilter) {
          oldFilters.splice(i, 1);
          remove = true;
        }
      }
      if (!remove) {
        oldFilters.push(actualFilter);
      }

      newFilters = { page: 1, categories: oldFilters};
    } else {
      newFilters = { page: 1, categories: actualFilter};
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: newFilters,
        queryParamsHandling: 'merge',
      });
  }

  ngOnInit() {
    this.listConfig = {
      type: 'all',
      user: '',
      filters: {
        limit: 3,
        offset: 0
      },
    };
    //--[TO REFRESH ACTUAL ROUTE]--\\
    this.route.queryParamMap.subscribe((params) => {
      let filters: GameFilters;
      let page: number = (parseInt(params.get('page') as string));
      let offset: number;
      if (page > 0) {
        offset = (page - 1) * this.listConfig.filters.limit
      } else {
        offset = NaN;
      }
      filters = {
        categories: params.getAll('categories') || [],
        limit: parseInt(params.get('limit') as string) || 3,
        offset: offset || 0,
        query: params.get('query') || '',
      };
      this.listConfig.filters = filters;
      this.filterConfig = filters;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
