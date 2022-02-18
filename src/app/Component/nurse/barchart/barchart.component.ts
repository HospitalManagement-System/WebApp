import { Component, OnInit } from '@angular/core';
import  Chart  from "chart.js/auto";
import { Bardata } from 'src/app/models/bardata';
import { DailogeService } from 'src/app/Services/dailoge.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent  {

  public chart !: Chart;
  public chartdata !: Bardata[]
  public disease : any[]=[]
  public patientcount : any[]=[]
  public  date = new Date();  
  public month = this.date.toLocaleString('default', { month: 'long' });
    
  constructor(public appoiService: DailogeService) { }
  
  ngOnInit() {
    this.getChartData();
  }
  getChartData() {
    this.appoiService.getBartData().subscribe(data => {
      this.chartdata=data;   
      console.log(this.chartdata) 
      for(let i=0;i<this.chartdata.length;i++)
      {   
       this.disease[i] =this.chartdata[i]["disease"]
       this.patientcount[i]=this.chartdata[i]["count"]
      }      
      this.chart = new Chart("canvas", {
        type: "bar",
        data: {
          labels: this.disease,
          datasets: [
            {
              
              data: this.patientcount,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
      });
    });
    
    }
    
  

}

  
