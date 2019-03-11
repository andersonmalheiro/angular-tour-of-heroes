import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HeroService {

  private heroUrl = 'http://localhost:8080/heroes/'; 

  getHeroes(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes");
    return this.http.get<Hero[]>(this.heroUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: string): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(this.heroUrl + id).pipe(
      tap(_ => this.log(`fetched hero ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addHero(name: string): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, {name}).pipe(
      tap(_ => this.log('hero added')),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(this.heroUrl + id);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroUrl + hero._id, hero).pipe(
      tap(_ => this.log(`hero updated`)),
      catchError(this.handleError<Hero>('update hero'))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
