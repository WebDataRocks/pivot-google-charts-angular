import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { WebDataRocksPivot } from "./webdatarocks/webdatarocks.angular4";
import { GoogleChartsModule } from "angular-google-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, WebDataRocksPivot],
  imports: [BrowserModule, GoogleChartsModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
