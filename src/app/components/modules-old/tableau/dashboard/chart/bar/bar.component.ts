import { ChartConfigurationComponent } from './../chart-configuration/chart-configuration.component';
import { DashboardService } from './../../dashboard.service';
import { Component,  AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import { QueryOptions, Filter } from '../../../../query-options';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent extends ChartConfigurationComponent implements AfterViewInit {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  context: CanvasRenderingContext2D;
  data: any;
  loading = true;

  constructor() { 
    super();
  }

  ngAfterViewInit() {
    this.loadData();
  }

   download() {
    const download = document.getElementById("downloadGraph");
    const image = (<HTMLCanvasElement>this.myCanvas.nativeElement).toDataURL("image/png");
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
  }

  loadData() {
    this.loading = true;
    this.data$.subscribe(
      (data) => {
        this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        const labels = this.chartConfig ? this.chartConfig.labels : [];

        let datasets: any[] = [];
        this.data = data.forEach(element => {
          let value = [];
          labels.forEach(label=>{
            const result = element.data.filter(word => word.libelle == label);
            if(result.length) {
              value.push(result[0].data)
            } else {
              value.push(0);
            }
          });
          datasets.push({
            label: element.libelle,
            type: element.type,
            backgroundColor: element.couleur,
            borderColor: element.couleur,
            fill: false,
            data: value
          })
        });

        
        
        let myChart = new Chart(this.context, {
          type: 'bar',      
          data: {
              labels: labels,
              datasets: datasets
          },
          options: {
            scales: {
                yAxes: [{
                  
                  ticks: {
                    min:0
                  }
                }],
              }
          }
        });
        this.loading = false;
      }
    )
  }

  
}
