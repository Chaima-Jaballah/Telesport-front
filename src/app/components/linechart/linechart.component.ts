import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';



@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent {
  @Input() selectedCountryId!: number;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [180, 480, 770, 90, 1000, 270, 400],

      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(private olympicsService: OlympicService) {

  }
  ngOnInit(): void {
    this.loadMedalsData(this.selectedCountryId);
  }
  loadMedalsData(id: number) {
    this.olympicsService.getOlympics().subscribe((olympics: Olympic[]) => {
      if (olympics) {
        let selectedCountrydata = olympics.filter(olympic => olympic.id == id)[0];
        let labels: number[] = [];
        let data: number[] = []
        selectedCountrydata.participations.forEach((participation: Participation) => {
          labels.push(participation.year)
          data.push(participation.medalsCount);
        })
        this.lineChartData.labels = labels;
        this.lineChartData.datasets = [{
          data: data,
          label: selectedCountrydata.country,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }]
      }
    })
  }
}


