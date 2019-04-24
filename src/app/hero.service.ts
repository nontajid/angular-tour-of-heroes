import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
                    .pipe(
                      tap(_ => this.log('fetch hero')),
                      catchError(this.handleError<Hero>('getHero id=${id}'))
                    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(
                      tap(_ => this.log('fetched heroes')),
                      catchError(this.handleError<Hero[]>('getHeroes', []))
                    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
                    .pipe(
                      tap(_ => this.log('updated heroes')),
                      catchError(this.handleError<any>('updateHero'))
                    );
  }

  addHero(hero: Hero): Observable<any> {
    return this.http.post(this.heroesUrl, hero, httpOptions)
                    .pipe(
                      tap(_ => this.log(`new hero with name ${hero.name} added`)),
                      catchError(this.handleError<any>('addHero'))
                    );
  }

  removeHero(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions)
                    .pipe(
                      tap(_ => this.log(`hero with id ${id} removed`)),
                      catchError(this.handleError<any>('removeHero'))
                    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
