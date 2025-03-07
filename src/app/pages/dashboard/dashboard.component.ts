import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { StatBoxComponent } from 'src/app/components/stat-box/stat-box.component';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  titleDashboard: string = 'Medals per Country';
  olympics$: Observable<Olympic[]> = of([]);
  sumJo$: Observable<number>= of(0);
  sumCountry$: Observable<number>=of(0);

  constructor(private olympicService: OlympicService) {}


  ngOnInit(): void {
    this.olympics$=this.olympicService.getOlympics();
    this.getNumberOfJo();
    this.getNumberOfCountry();
  }


  getNumberOfJo(): void {
    this.sumJo$=this.olympicService.numberOfJo();
  }

  getNumberOfCountry(): void {
    this.sumCountry$= this.olympicService.numberOfCountry();
  }


}
