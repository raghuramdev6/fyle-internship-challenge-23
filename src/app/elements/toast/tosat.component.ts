import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";

export enum toastTypes {
    error,
    success,
    info
}
  
export interface ToastData {
    message: string;
    show?: boolean;
    type?: toastTypes;
}

@Component({
    selector: 'toast',
    templateUrl: './toast.component.html'
})
export class ToastComponent implements OnChanges {
    @Input() message!: ToastData;
    toasts: ToastData[] = [];
    
    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes["message"].currentValue != undefined){
            this.add(changes["message"].currentValue)
        }
    }

    public add(data: ToastData){
        this.remove();
        this.toasts.push(data);
        this.showToast();
    }

    showToast(){
        setTimeout(() => {
            this.toasts[0].show = true;
            this.hideToast();
        },3)
    }

    hideToast(){
        setTimeout(() => {
            this.toasts[0].show = false;
        },3000)
    }

    remove(){
        this.toasts.pop();
    }

    getAnimeStyles(index: number): string{
        if(this.toasts[index].show){
            return 'transform transition-all duration-700 delay-700 -translate-x-64 ease-linear'
        }
        else{
            return 'transform transition-all duration-700 delay-700 translate-x-64 ease-linear'
        }
    }
}