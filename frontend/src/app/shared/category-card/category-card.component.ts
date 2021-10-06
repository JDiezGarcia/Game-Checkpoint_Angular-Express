import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  styleUrls: ['category-card.component.css'],
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  @Input() category?: String;

}


