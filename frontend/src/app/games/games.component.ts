import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameListConfig } from '../core';
@Component({
  selector: 'app-games-page',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {}

  listConfig!: GameListConfig;

  totalPages!: number;

  setTotalGame(total: number){
    this.totalPages = Math.ceil(total / this.listConfig.filters.limit);
  }

  setNewPage(actualPage: number){
    let page: Params = { page: actualPage}
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: page,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  ngOnInit() {
    this.listConfig = {
      type: "",
      filters: {
        limit: 3,
        offset: 0
      },
    };
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.queryParamMap.subscribe((params) => {
      console.log(typeof parseInt(params.get('page') as string))
      let page: number = (parseInt(params.get('page') as string));
      let offset: number;
      if(page > 0){
        offset =  (page - 1) * this.listConfig.filters.limit
      }else{
        offset = NaN;
      }
      this.listConfig.filters = {
        categories: params.getAll('categories') || [],
        limit: parseInt(params.get('limit')as string) || 3,
        offset: offset || 0,
        query: params.get('query') || '',
      };
    });
  }
}
