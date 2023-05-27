import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { data } from 'jquery';
import { Chart, registerables} from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables)
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{
  statistics:any
  bestOrder:any
  secondChartDataX:any
  secondChartDataY:any
  firstChartData: any;
  thirdChartData: any;
 constructor(private chartService:ChartService,public categoryService:CategoryService){
  
 }
 
  ngOnInit(): void {
    this.getStatistics()
    this.getmotSellerProduct()
    this.getSalesPerCategories()
    this.getCountOfRating()
    this.getSalesPerMonths()
    setTimeout(() => {
      this.secondChart()
      this.firstChart()
      this.thirdChart()

    }, 2000);
   
  }

  getStatistics(){
    this.chartService.getRessorces("generalInfo").subscribe(
      data => {
        this.statistics = data
       
      },err =>{
        console.log(err)
      }
    )
  }
  getCountOfRating(){
    this.chartService.getRessorces("ratingCount").subscribe((data:any) =>
      {
        this.firstChartData = data;
        console.log(data)
      
      })
  }
  getSalesPerMonths(){
    this.chartService.getRessorces("salesMonth").subscribe((data:any) =>
      {
        this.thirdChartData=data
        
      
      })
  }
  getSalesPerCategories(){
    this.chartService.getRessorces("salesCategory").subscribe((data:any) =>
      {
        this.secondChartDataX = Object.keys(data);
        this.secondChartDataY = Object.values(data);
      
      })
  }

  getmotSellerProduct(){
    this.chartService.getRessorces("mostOrdered").subscribe(
      data => {
        this.bestOrder = data
      },err =>{
        console.log(err)
      }
    )
  }


  thirdChart() {
    const labels =["january","february","march","april","may","june","july","august","november","october","september","december"];
const data = {
  labels: labels,
  datasets: [{
    label: 'Sales Per Months',
    data: this.thirdChartData,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
new Chart("salesMonths", {
  type: 'line',
  data: data,
})
  }
  secondChart() {
    const data = {
      labels: this.secondChartDataX,
      datasets: [{
        label: 'Sales',
        data: this.secondChartDataY,
        backgroundColor: [
          'rgb(178, 178, 218)',
          'rgb(153, 204, 204)',
          'rgb(192, 192, 192)',
          'rgb(153, 178, 218)',
          'rgb(204, 153, 102)',
          'rgb(230, 204, 204)',
          'rgb(204, 230, 204)',
          'rgb(230, 204, 179)',
          'rgb(153, 204, 153)',
          'rgb(230, 204, 153)',
          'rgb(230, 230, 153)',
          'rgb(204, 153, 51)',
          'rgb(153, 153, 204)',
          'rgb(128, 204, 204)',
          'rgb(230, 204, 128)',
          'rgb(230, 204, 102)',
          'rgb(255, 204, 153)',
          'rgb(179, 174, 96)'
        ],
        hoverOffset: 4
      }]
    };
    new Chart("salesByCategories", {
      type: 'pie',
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },})
  }
  firstChart() {
    new Chart("Ratingcount", {
      type: 'bar',
    data: {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
            label: 'count of rating',
            data: this.firstChartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1.5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                  stepSize:2
                }
            }
        }
    }}
  );
  }

}
