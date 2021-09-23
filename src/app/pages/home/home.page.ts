import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/assets/mockDb/db';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  popularSlideOpts = {
    slidesPerView: 2.2,
    spaceBetween: 10,
    shadow: true,
  };
  movieList = Movie;
  constructor(private router: Router) {}

  ngOnInit() {}
  movieDetail(id) {
    this.router.navigate(['movie-detail', id]);
  }
}
