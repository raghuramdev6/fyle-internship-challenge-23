import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'dialog-box',
    templateUrl: "./dialog-box.component.html"
})
export class DialogBoxComponent {
    @Output() dialogClosed = new EventEmitter<any>();
    showBox: boolean = false;
    constructor(){ }

    show(){
        this.showBox = true
    }

    hide(){
        this.showBox = false
    }

    close(){
        this.dialogClosed.emit(true);
        this.hide();
    }
}