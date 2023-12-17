import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from  '@angular/common/http';
import { UserSeachCompnent } from './user-search/user-search.component';
import { UserRepoListComponent } from './user-repo-list/user-repo-list.component';
import { ElementModule } from '../elements/element.module';

@NgModule({
  declarations: [
    UserSeachCompnent,
    UserRepoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ElementModule
  ],
  providers: [],
  bootstrap: []
})
export class ComponentModule { }
