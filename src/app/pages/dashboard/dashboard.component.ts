import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  olympics: Olympic[] = [];
  sumJo!: number;
  sumCountry!: number;

  constructor(private olympicService: OlympicService) {
    this.olympicService.getOlympics().subscribe(olympic => {
      this.olympics.push(olympic);
    })
  }
  ngOnInit(): void {
    this.getNumberOfJo();
    this.getNumberOfCountry();
  }




  getNumberOfJo(): void {
    this.olympicService.numberOfJo().subscribe((sum) => { this.sumJo = sum });
  }

  getNumberOfCountry(): void {
    this.olympicService.numberOfCountry().subscribe((sum) => { this.sumCountry = sum });
  }


}
