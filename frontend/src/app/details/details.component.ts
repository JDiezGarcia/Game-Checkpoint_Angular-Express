import { Component, OnInit } from '@angular/core';
import { Game } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) { }
  
  game!: Game;

  ngOnInit() {
    this.route.data.subscribe(
      (data => { this.game = data.game }))
  }
}
