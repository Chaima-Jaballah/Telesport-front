import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  selectedCountryId!: number;
  titleDetails: string = "";
  numberOfEntries!: number;
  totalMedals!: number;
  totalAthletesCount!: number;
  constructor(private activatedRoute: ActivatedRoute, private olympicsService: OlympicService,private location: Location) {
    this.activatedRoute.params.subscribe((param: any) => {
      this.selectedCountryId = param.id;
      this.olympicsService.getOlympics().subscribe(olympics => {
        if (olympics) {
          let selectedContry = olympics.filter((olympic: Olympic) => olympic.id == this.selectedCountryId);
          this.titleDetails = selectedContry[0].country
          this.getNumberOfEntries(this.selectedCountryId);
          this.getTotalNumberOfMedals(this.selectedCountryId);
          this.getTotalAthletes(this.selectedCountryId);
        }
      })
    })
  }


  getNumberOfEntries(id: number) {
    this.olympicsService.numberOfEntriesById(id).subscribe((numberOfEntries) => {
      this.numberOfEntries = numberOfEntries
    })
  }

  getTotalNumberOfMedals(id: number) {
    this.olympicsService.totalOfMedals(id).subscribe((totalMedalsCount) => {
      this.totalMedals = totalMedalsCount
    })
  }

  getTotalAthletes(id: number) {
    this.olympicsService.totalAthletes(id).subscribe((totalAthletesCount) => {
      this.totalAthletesCount = totalAthletesCount
    })
  }
  back(){
    this.location.back();
  }
}
