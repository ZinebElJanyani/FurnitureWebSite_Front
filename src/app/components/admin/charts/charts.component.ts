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
 constructor(private chartService:ChartService,public categoryService:CategoryService){
  
 }
 
  ngOnInit(): void {
    this.getStatistics()
    this.getmotSellerProduct()
    this.firstChart()
    this.secondChart()
    this.thirdChart()
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
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
new Chart("thisYearRevenue2", {
  type: 'line',
  data: data,
})
  }
  secondChart() {
    const data = {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }, {
        label: 'My Second Dataset',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};
new Chart("monthlyEarning", {
  type: 'radar',
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
    new Chart("thisYearRevenue", {
      type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }}
  );
  }

}
