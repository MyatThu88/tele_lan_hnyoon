import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/assets/mockDb/db';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movieList = Movie;
  currentMovie;
  constructor(private actvRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const movieId = this.actvRoute.snapshot.params['id'];
    this.getMovieDetail(movieId);
  }
  getMovieDetail(movieId) {
    this.currentMovie = this.movieList[movieId - 1];
    console.log(this.currentMovie.name);
  }
}
