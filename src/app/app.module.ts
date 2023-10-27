import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { WebdatarocksPivotModule } from '@webdatarocks/ngx-webdatarocks';
import { GoogleChartsModule } from "angular-google-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GoogleChartsModule.forRoot({version: 'current'}), WebdatarocksPivotModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}