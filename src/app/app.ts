import { Component, ViewChild } from "@angular/core";
import { WebdatarocksPivotModule, WebdatarocksComponent } from "@webdatarocks/ngx-webdatarocks";
import { TopMenuComponent } from '../components/top-menu/top-menu.component';
import "@webdatarocks/webdatarocks/webdatarocks.googlecharts.js";

declare let google: any;

@Component({
  selector: "app-root",
  standalone: true,
  imports: [WebdatarocksPivotModule, TopMenuComponent],
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})

export class App {
  @ViewChild("pivot") pivotRef!: WebdatarocksComponent;

  googleChartsLoaded: boolean = false;
  pivotTableReportComplete: boolean = false;

  chartData: any = [];

  report = {
    dataSource: {
      filename: "https://cdn.webdatarocks.com/data/data.csv",
    },
    slice: {
      rows: [
        {
          uniqueName: "Country",
        },
      ],
      columns: [
        {
          uniqueName: "Measures",
        },
      ],
      measures: [
        {
          uniqueName: "Price",
          aggregation: "sum",
        },
      ],
    },
  };

  ngOnInit(): void {
    google.charts.load("current", {
      packages: ["corechart", "bar"],
    });
    google.charts.setOnLoadCallback(() => this.onGoogleChartsLoaded());
  }

  onGoogleChartsLoaded() {
    this.googleChartsLoaded = true;
    // Handle the case when the report is complete before Google Charts is loaded
    if (this.pivotTableReportComplete) {
      this.createChart();
    }
  }

  onReportComplete() {
    // Unsubscribing from reportcomplete
    // We need it only to track the initialization of WebDataRocks
    this.pivotRef.webDataRocks.off("reportComplete");
    this.pivotTableReportComplete = true;
    // Handle the case when Google Charts is loaded before the report is complete
    if (this.googleChartsLoaded) {
      this.createChart();
    }
  }

  createChart() {
    this.pivotRef.webDataRocks.googlecharts?.getData(
      {
        type: "column",
      },
      // Function called when data for the chart is ready
      this.drawColumnChart.bind(this),
      // Function called on report changes (filtering, sorting, etc.)
      this.drawColumnChart.bind(this)
    );
  }

  drawColumnChart(_data: any) {
    let data = google.visualization.arrayToDataTable(_data.data);
    const columnChartContainer = document.getElementById("googlechartContainer");

    const options = {
      chartArea: {
        width: '85%',
        height: '60%'
      },
      legend: {
        position: 'right',
        textStyle: {
          fontSize: 12,
          color: '#666'
        }
      },
      hAxis: {
        title: 'Country',
        titleTextStyle: {
          fontSize: 14,
          italic: false,
          color: '#444',
        },
        textStyle: {
          fontSize: 12,
        }
      },
      vAxis: {
        title: 'Sum of Price',
        minValue: 0,
        gridlines: {
          count: 5,
          color: '#eee'
        },
        textStyle: {
          fontSize: 12,
        },
        titleTextStyle: {
          fontSize: 14,
          color: '#444'
        }
      },
      colors: ['#52b69a'],
      animation: {
        duration: 500,
        easing: 'out',
        startup: true
      },
      tooltip: {
        textStyle: {
          fontSize: 13
        },
        showColorCode: true
      },
      backgroundColor: '#fff'
    };

    const chart = new google.visualization.ColumnChart(columnChartContainer);
    chart.draw(data, options);
  }
}