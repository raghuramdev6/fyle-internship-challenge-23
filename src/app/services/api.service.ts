import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly BASE_URL = "https://api.github.com/users/";
  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string) {
    var that = this
    return this.httpClient.get(this.BASE_URL+`${githubUsername}`).pipe(
      catchError(function(error: HttpErrorResponse) {
        return that.handleError(error);
      })
    )
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
  getUserRepos(githubUsername: string, page:number, per_page:number){
    var that = this
    return this.httpClient.get(this.BASE_URL+`${githubUsername}/repos?page=${page}&per_page=${per_page}`).pipe(
      catchError(function(error: HttpErrorResponse) {
        return that.handleError(error);
      })
    );
  }

  handleError(error: HttpErrorResponse) {    
    return throwError(()=>{ throw new Error(`${error.status} - ${error.error}`)});
  }
}
