import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TrendsComponent } from './trends/trends.component';// custom component import to make it accessible across application //

@NgModule({
  declarations: [
    AppComponent,
    TrendsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
