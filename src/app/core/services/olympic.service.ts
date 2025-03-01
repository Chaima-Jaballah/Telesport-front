import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
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

  numberOfCountry() : Observable<number> {
    return this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        if (!olympics || olympics.length === 0) return 0;
        return olympics.length;
      })
    );

  }
}
