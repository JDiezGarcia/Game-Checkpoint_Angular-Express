import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoriesService, Category, GameFilters } from 'src/app/core';

@Component({
  selector: 'app-filters',
  styleUrls: ['filters.component.css'],
  templateUrl: 'filters.component.html'
})
export class FiltersComponent {

  constructor(
    private categoriesService: CategoriesService
  ){}

  @Output()handleFilters = new EventEmitter;
  @Input() set config(config: GameFilters){
    if(config){
      this.query = config;
      this.checks = config.categories as string[];
      this.loadFilters();
    }
  }

  query!: GameFilters;
  filters!: Category[];
  checks: string[] = [];

  loadFilters(){
    this.categoriesService.getAll(this.query).subscribe((data) =>{
      this.filters = data;
      this.filters.sort((a, b) => a._id < b._id ? -1 : a._id > b._id ? 1 : 0)
      for (let i = 0; i < this.filters.length; i++) {
        this.checks.forEach(filter => {
          if(this.filters[i]._id === filter ){
            this.filters[i].check = true;
          }
        });
      }
    })
  }

  clickOnFilter(filter: String){
    this.handleFilters.emit(filter);
  }

}
