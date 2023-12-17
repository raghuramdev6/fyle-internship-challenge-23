import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastData, toastTypes } from "src/app/elements/toast/tosat.component";
import { UserModel } from "src/app/models/UserModel";
import { ApiService } from "src/app/services/api.service";
import { ContextSevice } from "src/app/services/context.service";
import { UserDetails } from "src/app/services/interfaces";

@Component({
    selector: 'user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.scss']
})

export class UserSeachCompnent implements OnInit {
    title: string = 'Search GitHub User Public Repositories';
    subTitle: string = 'By Providing GitHub Username';
    toast!: ToastData;
    gitHubUser: UserDetails = {};
    user: UserModel;

    constructor(private apiService: ApiService, private route: Router, private contextService: ContextSevice){
        this.user = new UserModel();
    }
    
    ngOnInit() {

    }

    onSearch(){
        if(this.user.validate()){
            var that = this
            this.apiService.getUser(this.user.user_name.value).subscribe(
                {
                    next: res => {
                        this.setData(res);
                    },
                    error: err => {
                        console.info(err)
                        this.toast = {type: toastTypes.error,show: false, message: "Invalid Username."};
                        this.user.user_name.errorMessage = 'Invalid Username.';
                    }
                }
            );
        }else{
            this.toast = {type: toastTypes.info,show: false, message: "Please Enter Username"};
        }
    }

    setData(data: UserDetails){
        this.gitHubUser = {
            avatar_url: data.avatar_url,
            bio: data.bio, 
            html_url: data.html_url, 
            location: data.location, 
            name: data.name, 
            twitter_username: data.twitter_username,
            public_repos: data.public_repos,
            login: data.login
        }

        this.contextService.setUser(this.gitHubUser);
        this.route.navigate(['user-repos'])
    }
}