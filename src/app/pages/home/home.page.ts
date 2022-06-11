import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/assets/mockDb/db';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  popularSlideOpts = {
    slidesPerView: 3.2,
    spaceBetween: 10,
    shadow: true,
  };
  isSearchActive = false;
  searchForm = new FormControl('');
  movieList;
  japaneseMovieList;
  koreanMovieList;
  popularMovieList;
  chineseMovieList;
  animeMovieList;
  ionInfinteEvent;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private searhService: SearchService
  ) {}

  ngOnInit() {
    this.getEachMovieType();
  }

  getEachMovieType() {
    this.getMovies();
    this.getPopular();
    this.getJapanese();
    this.getKorean();
    this.getChinese();
    this.getAnime();
  }
  getMovies() {
    this.movieService.getMovies().subscribe((movie: any) => {
      console.log(movie);
      this.movieList = movie.data;
    });
  }
  getPopular() {
    this.movieService.getPopularMovie().subscribe((movie: any) => {
      this.popularMovieList = movie.data;
    });
  }
  getJapanese() {
    this.movieService.getMovieOfRegion('japanese').subscribe((movie: any) => {
      this.japaneseMovieList = movie.data;
    });
  }
  getKorean() {
    this.movieService.getMovieOfRegion('korean').subscribe((movie: any) => {
      this.koreanMovieList = movie.data;
    });
  }
  getChinese() {
    this.movieService.getMovieOfRegion('chinese').subscribe((movie: any) => {
      this.chineseMovieList = movie.data;
    });
  }
  getAnime() {
    this.movieService.getMovieOfRegion('anime').subscribe((movie: any) => {
      this.animeMovieList = movie.data;
    });
  }
  movieDetail(id) {
    this.router.navigate(['movie-detail', id]);
  }
  onSearchEnter() {
    this.searhService.emitSearchEvent(this.searchForm.value, 'movies');
  }
  onSearchCancel() {
    if (!this.isSearchActive) {
      this.searhService.emitBottomDrawerEvent();
    } else {
      this.isSearchActive = false;
      this.searchForm.setValue('');
    }
  }
  handleSearchInput() {
    this.isSearchActive = true;
    if (this.searchForm.value == '') {
      this.isSearchActive = false;
      this.searhService.emitSearchEvent('', 'movies');
    }
  }
  calculateCurrentEpisode(episode) {
    const burmeseEp = episode?.burmese.length;
    const engEp = episode?.english.length;
    return burmeseEp > engEp ? burmeseEp : engEp;
  }
  loadData(e) {
    this.ionInfinteEvent = e;
    this.searhService.emitSearchEvent('', 'movies', true);
  }
  onComplete(e) {
    console.log(this.ionInfinteEvent);
    this.ionInfinteEvent?.target.complete();
  }
}
