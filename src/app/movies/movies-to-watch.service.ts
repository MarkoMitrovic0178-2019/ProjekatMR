import { Injectable } from '@angular/core';
import { MovieToWatch } from "./movies-to-watch.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, switchMap, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { environment } from "../../environments/environment";

interface MovieToWatchData {
  director: string;
  name: string;
  imageUrl: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesToWatchService {
  private _movieToWatch = new BehaviorSubject<MovieToWatch[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get movieToWatch() {
    return this._movieToWatch.asObservable();
  }

  addMovieToWatch(director: string, name: string, imageUrl: string) {
    let generatedId: string;
    const userId = this.authService.getUserID();

    let newMovieToWatch: MovieToWatch = new MovieToWatch(
      '',
      director,
      name,
      imageUrl,
      userId
    );

    return this.http
      .post<{ name: string }>(`${environment.firebaseRealtimeDataBaseUrl}/moviesToWatch/${userId}.json?auth=${this.authService.getToken()}`,
        newMovieToWatch)
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.movieToWatch;
        }),
        take(1),
        tap((movieToWatch) => {
          newMovieToWatch.id = generatedId;
          this._movieToWatch.next(
            movieToWatch.concat(newMovieToWatch)
          );
        })
      );
  }

  getMoviesToWatch() {
    const userId = this.authService.getUserID();
    return this.http
      .get<{ [key: string]: MovieToWatchData }>(`${environment.firebaseRealtimeDataBaseUrl}/moviesToWatch/${userId}.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((movieToWatchData) => {
          const moviesToWatch: MovieToWatch[] = [];

          for (const key in movieToWatchData) {
            moviesToWatch.push(
              new MovieToWatch(
                key,
                movieToWatchData[key].director,
                movieToWatchData[key].name,
                movieToWatchData[key].imageUrl,
                movieToWatchData[key].userId
              ));
          }
          return moviesToWatch;
        }),
        tap((moviesToWatch) => {
          this._movieToWatch.next(moviesToWatch);
        }));
  }

  getMovieToWatch(id: string) {
    const userId = this.authService.getUserID();
    return this.http
      .get<MovieToWatchData>(`${environment.firebaseRealtimeDataBaseUrl}/moviesToWatch/${userId}/${id}.json?auth=${this.authService.getToken()}`)
      .pipe(
        map((resData) => {
          return new MovieToWatch(
            id,
            resData.director,
            resData.name,
            resData.imageUrl,
            resData.userId
          );
        }));
  }

  deleteMovieToWatch(id: string) {
    const userId = this.authService.getUserID();
    return this.http
      .delete(`${environment.firebaseRealtimeDataBaseUrl}/moviesToWatch/${userId}/${id}.json?auth=${this.authService.getToken()}`)
      .pipe(
        switchMap(() => {
          return this.movieToWatch;
        }),
        take(1),
        tap((moviesToWatch) => {
          this._movieToWatch.next(moviesToWatch.filter((m) => m.id !== id));
        })
      );
  }

  editMovieToWatch(movieId: string, director: string, name: string, imageUrl: string, userId: string) {

    return this.http
      .put(`${environment.firebaseRealtimeDataBaseUrl}/moviesToWatch/${userId}/${movieId}.json?auth=${this.authService.getToken()}`,
        { director, name, imageUrl, userId })
      .pipe(
        switchMap(() => this.movieToWatch),
        take(1),
        tap((moviesToWatch) => {
          const updatedMovieToWatchIndex = moviesToWatch.findIndex((m) => m.id === movieId);
          const updatedMoviesToWatch = [...moviesToWatch];
          updatedMoviesToWatch[updatedMovieToWatchIndex] = new MovieToWatch(
            movieId,
            director,
            name,
            'https://ideas.staticsfly.com/ideas/wp-content/uploads/2016/04/graduation-quote_college_nora-ephron.jpg',
            '1',
          );
          this._movieToWatch.next(updatedMoviesToWatch);
        })
      );
  }
}
