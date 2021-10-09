import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit() {
    this.listConfig = {
      type: "",
      filters: {
        limit: 10,
        offset: 0
      },
    };
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.queryParamMap.subscribe((params) => {
      this.listConfig.filters = {
        categories: params.getAll('categories') || [],
        limit: parseInt(params.get('limit')as string) || 10,
        offset: parseInt(params.get('offset')as string) || 0,
        query: params.get('query') || '',
      };
    });
  }
}
