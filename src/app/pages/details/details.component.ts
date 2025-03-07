import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{
  selectedCountryId: number=0;
  titleDetails: string = "";
  numberOfEntries$: Observable<number>= of(0);
  totalMedals$: Observable<number>= of(0);
  totalAthletesCount$: Observable<number>= of(0);
  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private olympicsService: OlympicService,private location: Location) 
  {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: any) => {
      this.selectedCountryId = param.id;
      this.olympicsService.getOlympics().pipe(takeUntil(this.destroy$))
      .subscribe(olympics => {
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
    this.numberOfEntries$ =  this.olympicsService.numberOfEntriesById(id);
  }

  getTotalNumberOfMedals(id: number) {
    this.totalMedals$= this.olympicsService.totalOfMedals(id);
  }

  getTotalAthletes(id: number) {
    this.totalAthletesCount$= this.olympicsService.totalAthletes(id);
  }

  back(){
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
