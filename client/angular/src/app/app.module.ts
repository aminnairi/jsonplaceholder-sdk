import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonPlaceholderUsersService } from '@jsonplaceholder-sdk/angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    JsonPlaceholderUsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
