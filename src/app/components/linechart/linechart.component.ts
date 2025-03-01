import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent {

  /*//@Input() medalsCountry!: number[] ;
  //@Input() years!: number[] ;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [], // Sera rempli dynamiquement
        label: 'Nombre de médailles',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 0.8)',
        fill: 'origin',
        tension: 0.4,
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: 'Dates' } },
      y: { title: { display: true, text: 'Nombre de détails' } },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  /*ngOnInit(): void {
    this.updateChartData();
  }

  private updateChartData(): void {
    this.lineChartData.datasets[0].data = this.medalData;
    this.lineChartData.labels = this.years;
    this.chart?.update();
  }*/   //à voir demain 
}


