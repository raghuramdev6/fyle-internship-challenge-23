import { Injectable } from "@angular/core";
import { UserDetails } from "./interfaces";

@Injectable({providedIn: "root"})
export class ContextSevice {
    user!: UserDetails;
    spinnerContext!: any;

    getUser(): UserDetails{
        return this.user;
    }

    setUser(data: UserDetails){
        this.user = data;
    }
}