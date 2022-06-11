import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';

import { MovieGenreList } from '../../env/env';
@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.page.html',
  styleUrls: ['./genre-detail.page.scss'],
})
export class GenreDetailPage implements OnInit {
  genreList = MovieGenreList;
  genre;
  movieList;
  genreId;
  constructor(
    private movieService: MovieService,
    private actvRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.genreId = this.actvRoute.snapshot.params['id'];
    this.genre = this.genreList[this.genreId];
    console.log(this.genreId);

    this.loadMovie();
  }
  loadMovie() {
    this.movieService
      .getMovieByGenre(this.genre.name)
      .subscribe((movie: any) => {
        console.log(movie);
        this.movieList = movie.data;
        console.log(this.movieList);
      });
  }
}
