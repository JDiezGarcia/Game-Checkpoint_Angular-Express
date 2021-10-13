import { Component, Output, EventEmitter, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pagination',
    styleUrls: ['pagination.component.css'],
    templateUrl: './pagination.component.html',
})
export class PaginationComponent {
    constructor(
        private route: ActivatedRoute
    ) { }
    @Output() pageSelect = new EventEmitter();
    @Input() set totalPages(totalPages: number){
        this.maxPage = totalPages;
        this.setPages();
    };

    actualPage!: number;
    maxPage!: number;
    previousPage!: number;
    nextPage!: number;
    lastPage!: number;
    firstPage!: number;

    select(page: number) {
        this.pageSelect.emit(page);
    }

    setPages(){
        
        this.firstPage = NaN;
        if(this.actualPage != 1){
            this.previousPage = this.actualPage - 1;
            this.firstPage = 1;
         };
        if(this.maxPage != this.actualPage){
            this.lastPage = this.maxPage;
            this.nextPage = this.actualPage + 1;
         };

    }

    ngOnInit(){
        this.route.queryParamMap.subscribe((params) => {
            this.actualPage = parseInt(params.get('page') as string)
            if (!this.actualPage) {
                this.actualPage = 1;
            }
        });
    }
}
