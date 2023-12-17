import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Validators {
    static isEmpty(value: any) {
        return (typeof value === "undefined" || value === null || (typeof value === "string" && value.length === 0));
    }

    static isNumber(value: any) {
        return /^[0-9]+$/.test(value);
    }

    static isBetween(value: number, min: number, max: number){
        return !Validators.isEmpty(value) && Validators.isNumber(value) && Number(value) >= min && Number(value) <= max;
    }
}

export class Validations {
    static EMPTY: number = 1;
    static NUMBER: number = 2;
    static BETWEEN: number = 4;
}