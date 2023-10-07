import { Injectable } from '@angular/core';
import {Movie} from "./movies.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, switchMap, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";




interface MovieData{
  director:string;

  name:string;

  imageUrl:string;

  critique:string;

  userId:string;
}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _movies= new BehaviorSubject<Movie[]>([]);

 constructor(private http:HttpClient,private authService:AuthService) { }

  get movie(){
   return this._movies.asObservable();
  }
addMovie(director:string,name:string,imageUrl:string,critique:string){
  let generatedId:string;
   const userId=this.authService.getUserID();


  let newMovie: Movie = new Movie(
    '',
    director,
    name,
    imageUrl,
    critique,
    userId
  );

  return this.http
    .post<{ name: string }>(`${environment.firebaseRealtimeDataBaseUrl}/movies/${userId}.json?auth=${this.authService.getToken()}`,
      newMovie)
    .pipe(
      switchMap((resData) => {
        generatedId = resData.name;
        return this.movie;
      }),
      take(1),
      tap((movies) => {
        newMovie.id = generatedId;
        this._movies.next(
          movies.concat(newMovie)
        );
      })
    );
}

getMovies(){
  const userId=this.authService.getUserID();
  return this.http
    .get<{ [key: string]: MovieData }>(`${environment.firebaseRealtimeDataBaseUrl}/movies/${userId}.json?auth=${this.authService.getToken()}`)
    .pipe(
      map((movieData) => {
        const movies: Movie[] = [];

        for (const key in movieData) {
          movies.push(
            new Movie(
              key,
              movieData[key].director,
              movieData[key].name,
              movieData[key].imageUrl,
              movieData[key].critique,
              movieData[key].userId
            ));
        }
        return movies;
      }),
      tap((movies) => {
        this._movies.next(movies);
      }));
 }

  getMovie(id: string) {
    const userId=this.authService.getUserID();
    return this.http
      .get<MovieData>(`${environment.firebaseRealtimeDataBaseUrl}/movies/${userId}/${id}.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((resData) => {
          return new Movie(
            id,
            resData.director,
            resData.name,
            resData.imageUrl,
            resData.critique,
            resData.userId
          );
        }));
  }

  deleteMovie(id: string) {
   const userId=this.authService.getUserID();
    return this.http
      .delete(`${environment.firebaseRealtimeDataBaseUrl}/movies/${userId}/${id}.json?auth=${this.authService.getToken()}`)
      .pipe(
        switchMap(() => {
          return this.movie;
        }),
        take(1),
        tap((movies) => {
          this._movies.next(movies.filter((m) => m.id !== id));
        })
      );
  }

  editMovie(movieId: string, director: string, name: string, imageUrl: string, critique: string, userId:string) {

    return this.http
      .put(`${environment.firebaseRealtimeDataBaseUrl}/movies/${userId}/${movieId}.json?auth=${this.authService.getToken()}`,
        {director, name, imageUrl, critique,userId})
      .pipe(
        switchMap(() => this.movie),
        take(1),
        tap((movies) => {
          const updatedMovieIndex = movies.findIndex((m) => m.id === movieId);
          const updatedMovies = [...movies];
          updatedMovies[updatedMovieIndex] = new Movie(
            movieId,
            director,
            name,
            'https://ideas.staticsfly.com/ideas/wp-content/uploads/2016/04/graduation-quote_college_nora-ephron.jpg',
            '1',
            userId
          );
          this._movies.next(updatedMovies);
        })
      );
  }


}
