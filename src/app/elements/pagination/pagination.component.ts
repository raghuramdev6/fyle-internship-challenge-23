import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: "pagination",
    templateUrl: "./pagination.component.html"
})

export class PaginationComponent implements OnInit, OnChanges {
    @Input() currentPage: number = 1;
    @Input() perPage: number = 10;
    @Input() totalRec: number = 0;
    @Input() totalPagesToDispaly: number = 7;
    @Output() changedPage = new EventEmitter<number>();

    pages: number[] = []
    constructor(){

    }
    ngOnChanges(changes: SimpleChanges): void {
        if(Object.hasOwn(changes, "perPage")){
            this.currentPage = 1;
        }
        var pageCount: number = Math.ceil(this.totalRec/this.perPage);
        this.pages = this.range(this.currentPage, pageCount);
    }

    ngOnInit(): void {
        this.initilaze()      
    }

    initilaze(){
        var pageCount: number = Math.ceil(this.totalRec/this.perPage);
        this.pages = this.range(this.currentPage, pageCount);  
    }

    range(start: number, end: number): number[] {
        return [...Array(end).keys()].map(e=> e + start);
    }

    pageChanged(page: number){
        this.currentPage = page;
        this.emitPageChange();
    }

    previousPage(){
        if(!(this.pages.length == 0 || this.currentPage<=this.pages[0])){
            this.currentPage--;
            this.emitPageChange();
        }
    }

    nextPage(){
        if(!(this.pages.length == 0 || this.currentPage>=this.pages.length)){
            this.currentPage++;
            this.emitPageChange();
        }
    }

    startPage(){
        this.currentPage = this.pages[0];
        this.emitPageChange();
    }

    lastPage(){
        this.currentPage = this.pages[this.pages.length-1];
        this.emitPageChange();
    }

    emitPageChange(){
        this.changedPage.emit(this.currentPage);
    }

    getStyles(page: number): {[kclass:string]: any}{
        if(this.pages.length>this.totalPagesToDispaly){
            if(page >= this.currentPage && page <= (this.currentPage + this.totalPagesToDispaly-1) ){
                return {display: 'inline-block'}
            }
            if(page>(this.pages.length-this.totalPagesToDispaly) && this.currentPage > page ){
                return {display: 'inline-block'}
            }
            return {display: 'none'}
        }
        return {};
    }

    getStyleClasses(page: number){
        if(page === this.currentPage){
            return 'bg-blue-600 !text-white';
        }
        return '';
    }
}