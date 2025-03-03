import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      // Réessaie automatiquement 2 fois en cas d'erreur
      retry(2),

      catchError((error, caught) => {
        console.error("Erreur lors de la récupération des données olympiques :", error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return throwError(() => error);;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  numberOfJo(): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        let uniqueYears = new Set<number>();
        if (!olympics || olympics.length === 0) return 0;
        olympics.forEach((country) => {
          country.participations.forEach((participation) => {
            uniqueYears.add(participation.year);
          });
        });
        return uniqueYears.size;
      })
    );
  }

  numberOfCountry(): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        if (!olympics || olympics.length === 0) return 0;
        return olympics.length;
      })
    );
  }

  numberOfEntriesById(id: number): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        if (!olympics || olympics.length === 0) return 0;
        let selectedCountry = olympics.filter((olympic: Olympic) => olympic.id == id);
        return selectedCountry[0].participations.length;
      })
    );

  }

  totalOfMedals(id: number): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        if (!olympics || olympics.length === 0) return 0;
        let selectedCountry = olympics.filter((olympic: Olympic) => olympic.id == id);
        let totalMedals = 0;
        selectedCountry[0].participations.forEach(participation => {
          totalMedals = totalMedals + participation.medalsCount;
        })
        return totalMedals;
      })
    )
  }

  totalAthletes(id: number): Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        if (!olympics || olympics.length === 0) return 0;
        let selectedCountry = olympics.filter((olympic: Olympic) => olympic.id == id);
        let athleteCount = 0;
        selectedCountry[0].participations.forEach(participation => {
          athleteCount = athleteCount + participation.athleteCount;
        })
        return athleteCount;
      })
    )
  }


}
