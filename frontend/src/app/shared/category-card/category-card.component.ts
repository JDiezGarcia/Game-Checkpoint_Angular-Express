import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../core';

@Component({
  selector: 'app-category-card',
  styleUrls: ['category-card.component.css'],
  templateUrl: './category-card.component.html',
  host: {
    '[style.background-color]': 'color'
    }
})
export class CategoryCardComponent {
  @Output() categorySelect = new EventEmitter();
  @Input() category!: Category;
  
  color!: String;

  ngOnInit(){
    this.color = this.getCategoryColor();
  }
  getCategoryColor() {
    if (!this.category?._id) {
      return '#fff';
    }

    var hash: number = this.category._id.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    var color: String = ((hash >>> 0) & 0xffffff).toString(16).padStart(6, '0');
    return '#' + color;
  }
  select(){
    this.categorySelect.emit(this.category._id);
  }
}
