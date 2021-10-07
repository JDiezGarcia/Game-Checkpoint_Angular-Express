import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  styleUrls: ['category-card.component.css'],
  templateUrl: './category-card.component.html',
  host: {
    '[style.background-color]': 'color'
    }
})
export class CategoryCardComponent {
  @Input() category?: String;

  color!: String;

  ngOnInit(){
    this.color = this.getCategoryColor();
  }
  getCategoryColor() {
    if (!this.category) {
      return '#fff';
    }

    var hash: number = this.category.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    var color: String = ((hash >>> 0) & 0xffffff).toString(16).padStart(6, '0');
    return '#' + color;
  }
  
}
