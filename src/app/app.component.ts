import { Component, ViewChild } from "@angular/core";
import { WebdatarocksComponent } from '@webdatarocks/ngx-webdatarocks';
import "@webdatarocks/webdatarocks/webdatarocks.googlecharts.js"
// import { GoogleChartComponent } from "angular-google-charts";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("pivot1") child: WebdatarocksComponent;

  public pivotReport = {
    dataSource: {
      filename: "https://cdn.webdatarocks.com/data/data.csv"
    },
    slice: {
      rows: [{ uniqueName: "Business Type" }],
      columns: [{ uniqueName: "Measures" }],
      measures: [{ uniqueName: "Price", aggregation: "sum" }]
    }
  };

  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log("[ready] WebDataRocksPivot", this.child);
  }

  onCustomizeCell(
    cell: WebDataRocks.CellBuilder,
    data: WebDataRocks.CellData
  ): void {
    //console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }

  googleChartsLoaded: boolean = false;

  onReportComplete(): void {
    this.child.webDataRocks.off("reportcomplete");
    this.createGoogleChart();
  }

  createGoogleChart() {
    this.child.webDataRocks.googlecharts.getData(
      { type: "bar_h" },
      data => this.drawChart(data),
      data => this.drawChart(data)
    );
  }

  drawChart(_data: any) {
    google.charts.setOnLoadCallback(()=>{
      var data = google.visualization.arrayToDataTable(_data.data);
      let chart = new google.visualization.BarChart(document.getElementById('chart'));
      chart.draw(data, {
        width: 900,
        height: 500
      });
    });
  }
}