import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormField } from "src/app/services/form.service";

@Component({
    selector: 'search-input',
    templateUrl: "./search-input.component.html",
    styleUrls: ['./search-input.component.scss']
})

export class SearchInputComponent {
    @Input() form!: FormField;
    @Input() label!: string;
    @Input() type!: string;
    @Input() tabindex!: number;

    constructor(){}
}