import { Component, ViewChild } from "@angular/core";
import { WebDataRocksPivot } from "./webdatarocks/webdatarocks.angular4";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("pivot1") child: WebDataRocksPivot;

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

  ngOnInit() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => this.onGoogleChartsLoaded());
  }
  onGoogleChartsLoaded() {
    this.googleChartsLoaded = true;
    if (this.pivotTableReportComplete) {
      this.createGoogleChart();
    }
  }

  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log("[ready] WebDataRocksPivot", this.child);
  }

  onCustomizeCell(
    cell: WebDataRocks.CellBuilder,
    data: WebDataRocks.Cell
  ): void {
    //console.log("[customizeCell] WebDataRocksPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }

  pivotTableReportComplete: boolean = false;
  googleChartsLoaded: boolean = false;

  onReportComplete(): void {
    this.child.webDataRocks.off("reportcomplete");
    this.pivotTableReportComplete = true;
    this.createGoogleChart();
  }

  createGoogleChart() {
    if (this.googleChartsLoaded) {
      this.child.webDataRocks.googlecharts.getData(
        { type: "column" },
        data => this.drawChart(data),
        data => this.drawChart(data)
      );
    }
  }

  drawChart(_data: any) {
    var data = google.visualization.arrayToDataTable(_data.data);

    var options = {
      title: "Sales by Business Types",
      legend: { position: "top" },
      colors: ["#7570b3"],
      isStacked: true
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("googlechart-container")
    );
    chart.draw(data, <google.visualization.ColumnChartOptions>options);
  }
}
