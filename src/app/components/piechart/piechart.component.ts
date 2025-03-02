import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss'
})
export class PiechartComponent{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  olympics!: Olympic[];
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        color:"white",
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return '';
        },
      },
    },
    onClick:(event, elements) => {
      const index = elements[0].index; // Get clicked index
        const id = this.olympics[index].id;
        this.router.navigateByUrl(`details/${id}`)
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        backgroundColor: ['#955251', '#6495ED', '#4682B4', '#A9C5D3', '#BCAAA4'],
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  @Input() data!:Olympic[];
  constructor(private olympicService: OlympicService,private router: Router){
    this.loadMedalsData();
  }

loadMedalsData() : void {
  this.olympicService.getOlympics().subscribe((olympics) => {
    if (olympics) {
      let countryLabels: string[] = [];
      let medalCounts: number[] = [];
      this.olympics = olympics;
      // Parcours des données JSON
      olympics.forEach((olympic: Olympic) => {
        let totalMedals = olympic.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
        countryLabels.push(olympic.country);
        medalCounts.push(totalMedals);
      });
      
      // Mise à jour des données du graphique
      this.pieChartData.labels = countryLabels;
      this.pieChartData.datasets[0].data = medalCounts;

      // Forcer la mise à jour du graphique
      this.chart?.update();
    }
  });

}

}
