import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserModule } from '@angular/platform-browser';
import { SearchInputComponent } from './search-input/search-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './toast/tosat.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    PaginationComponent,
    SearchInputComponent,
    ToastComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  bootstrap: [],
  exports: [
    PaginationComponent,
    SearchInputComponent,
    ToastComponent,
    DialogBoxComponent
  ]
})
export class ElementModule {
  constructor() {
  }
}
