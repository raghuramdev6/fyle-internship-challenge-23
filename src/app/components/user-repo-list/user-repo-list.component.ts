import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DialogBoxComponent } from "src/app/elements/dialog-box/dialog-box.component";
import { ToastData, toastTypes } from "src/app/elements/toast/tosat.component";
import { UserReposModel } from "src/app/models/UserReposModel";
import { ApiService } from "src/app/services/api.service";
import { ContextSevice } from "src/app/services/context.service";
import { UserDetails, UserRepoList } from "src/app/services/interfaces";

@Component({
    selector: 'user-repos',
    templateUrl: './user-repo-list.component.html',
    styleUrls: ['./user-repo-list.component.scss']
})

export class UserRepoListComponent implements OnInit {
    @ViewChild('dialogBox') dialogBox!: DialogBoxComponent
    gitHubUser: UserDetails = {};
    userRepoList: Array<UserRepoList> = [];
    currentPage: number = 1;
    perPage: number = 10;
    totalRec: number = 100;
    totalPagesToDispaly: number = 8;
    loader: boolean = true;
    toast!: ToastData;
    dialogBoxTitle = "Please number of repository to display per page";
    userRepoModel!: UserReposModel;

    constructor(private apiService: ApiService, private contextSerice: ContextSevice, private route: Router){
        this.userRepoModel = new UserReposModel();
        this.userRepoModel.reset();
    }

    ngOnInit(): void {
        this.getPreviousComponentParams()
    }

    getPreviousComponentParams(){
        if(typeof this.contextSerice.getUser() != "undefined" && this.contextSerice.getUser().login != null){
            this.getUserDetails()
        }else{
            this.route.navigate(['']);
        }
    }

    getUserDetails(){
        this.showLoader();
        this.apiService.getUser(this.contextSerice.getUser().login as string).subscribe(
            {
                next: res => {
                    this.formatUserData(res)
                },
                error: err => {
                    this.hideLoader();
                    this.route.navigate(['']);
                }
            }
        );
    }

    formatUserData(userData: UserDetails){
        this.gitHubUser = {
            avatar_url: userData.avatar_url,
            bio: userData.bio, 
            html_url: userData.html_url, 
            location: userData.location, 
            name: userData.name, 
            twitter_username: userData.twitter_username,
            public_repos: userData.public_repos,
            login: userData.login
        }

        this.totalRec = Number(this.gitHubUser.public_repos);
        this.getReposDetails(this.gitHubUser.login as string, this.currentPage, this.perPage);
    }

    getReposDetails(username: string, page:number, perPage:number){
        this.showLoader()
        this.apiService.getUserRepos(username, page, perPage).subscribe({
            next: res => {
                this.formatUserRepoList(res as Array<UserRepoList>)
            },
            error: err => {
                this.hideLoader();
            }
        });
    }

    formatUserRepoList(userRepos: Array<UserRepoList>){
        this.userRepoList = [];
        userRepos.forEach(repos=>{
            this.userRepoList.push(
                {
                    name: repos.name,
                    description: repos.description, 
                    topics: repos.topics
                }
            )
        })
        this.hideLoader(); 
    }

    pageChanged(page: number){
        this.getReposDetails(this.gitHubUser.login as string, page,this.perPage);
    }

    hideLoader(){
        this.loader = false;
    }

    showLoader(){
        this.loader = true;
    }

    show(){
        this.dialogBox.show();
    }

    hide(){
        this.dialogBox.hide();
    }

    setPerPage(){
        if(this.userRepoModel.validate()){
            this.perPage = this.userRepoModel.per_page.value;
            this.hide();
            this.currentPage = 1;
            this.pageChanged(1);
        }

        if(!this.userRepoModel.per_page.valid){
            this.toast = {type: toastTypes.info,show: false, message: this.userRepoModel.per_page.errorMessage};
        }
    }

    dislogClosed(){
        this.userRepoModel.reset();
    }
}