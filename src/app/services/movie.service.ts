import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // baseUrl = 'https://telelanhnyoon.herokuapp.com';
  baseUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`${this.baseUrl}/api/v1/movies`);
  }
  getPopularMovie() {
    return this.http.get(`${this.baseUrl}/api/v1/movies/popular`);
  }
  async getMovieById(id) {
    return await this.http
      .get(`${this.baseUrl}/api/v1/movies/${id}`)
      .toPromise();
  }
  getMovieOfRegion(region, skip = 0) {
    return this.http.get(
      `${this.baseUrl}/api/v1/movies/specific/${region}/${skip}`
    );
  }
  getMovieByGenre(genre, skip = 0) {
    return this.http.get(
      `${this.baseUrl}/api/v1/movies/genre/${genre}/${skip}`
    );
  }
}
