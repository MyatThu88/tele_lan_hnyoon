import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/assets/mockDb/db';
import { TmdbService } from '../../services/tmdb.service';
import { MovieService } from '../../services/movie.service';
import { IronStorageService } from '../../services/localstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  currentMovie;
  maxLength: number = 110;
  episodes: any[] = [];
  isImgLoaded = false;
  selectedSeason = 1;
  tmdbInfo;
  lastWatchedEP: number;
  castSlideOpts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    shadow: true,
  };
  toggleSubtitleEng = false;
  type;
  data;
  options;
  subtitle = 'burmese';
  constructor(
    private actvRoute: ActivatedRoute,
    private router: Router,
    private tmdb: TmdbService,
    private movieService: MovieService,
    private ionStorage: IronStorageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const movieId = this.actvRoute.snapshot.params['id'];
    this.getMovieDetail(movieId);
    console.log('single movie detail', this.episodes);
    this.showChart(this.episodes);
    // this.movieService.getMovies().subscribe((movie: any) => {
    //   console.log(movie.data);
    // });
  }

  ngAfterViewInit() {}

  async getMovieDetail(movieId) {
    await this.movieService.getMovieById(movieId).then((resp: any) => {
      console.log(' mongo data resp', resp);
      this.currentMovie = resp.data;
      this.subtitle = this.currentMovie.sub[0].toLowerCase();
      console.log(this.subtitle);

      this.selectedSeason = resp.data.selectedSeason
        ? resp.data.selectedSeason
        : 1; //only for kamen rider series's same mdbID problem
    });
    this.fetchLocalClickHistory(this.currentMovie.mdbId);
    this.tmdb
      .getMovieDetail(this.currentMovie.mdbId, this.currentMovie.type)
      .subscribe((data: any) => {
        console.log('real tmdb data', data);
        this.tmdbInfo = data;
        if (this.currentMovie.type == 'tv') {
          this.fetchEpisode(data);
        }
      });
  }

  showAll(length) {
    this.maxLength = length;
  }

  handleClick(epNo) {
    console.log(epNo);
  }

  fetchLocalClickHistory(mdbId) {
    console.log(mdbId);
    console.log('mdb ID from local storage', localStorage.getItem(mdbId));
    this.lastWatchedEP = parseInt(localStorage.getItem(mdbId));
    // this.ionStorage.getLastWatchedep(mdbId).then((ep) => {
    //   console.log('ion storage value '), ep;
    //   this.lastWatchedEP = parseInt(ep);
    // });
  }
  imageLoadHandler() {
    this.isImgLoaded = true;
  }

  fetchEpisode(data) {
    this.tmdb
      .getEpisodeDetail(
        this.currentMovie.mdbId,
        this.selectedSeason,
        data.seasons[this.selectedSeason - 1].episode_count,
        data.last_episode_to_air
      )
      .subscribe((episode: any) => {
        this.episodes.push(episode);
        this.selectedSeason = this.currentMovie.selectedSeason //condition checked for kamen rider irregular api problem
          ? this.currentMovie.selectedSeason + 1 //this.currentMovie.selectedSeason condition meant only for kamen rider series
          : this.selectedSeason;
        console.log('tmdb episode list', this.episodes);

        if (
          this.episodes.length ==
            data.seasons[this.selectedSeason - 1].episode_count ||
          this.episodes.length == data.last_episode_to_air?.episode_number //conditon checked for episode rating hcart not showing in ongoing series
        ) {
          console.log('aa testing uhear me haha');

          this.showChart(this.episodes);
        }
      });
  }

  onPersonDetail(id) {
    this.router.navigate(['person-detail', id]);
  }
  showChart(episodes) {
    let rating = [];
    let numberOfep = [];
    let chartType;
    let backgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.4)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ];
    let borderColor = [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ];
    if (
      this.tmdbInfo &&
      this.tmdbInfo.next_episode_to_air &&
      this.tmdbInfo.next_episode_to_air.season_number == this.selectedSeason
    ) {
      chartType = 'horizontal';
    }

    for (const key in episodes) {
      numberOfep.push(parseInt(key) + 1);
      console.log(key);

      rating.push(
        episodes[key].id % 10 < 4
          ? (episodes[key].id % 10) + 3
          : episodes[key].id % 10
      );
      backgroundColor.push(backgroundColor[key]);
      borderColor.push(borderColor[key]);
    }
    if (chartType == 'horizontal') {
      this.type = 'horizontalBar';
      this.data = {
        labels: numberOfep,
        datasets: [
          {
            label: 'Rating Point',
            data: rating,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      };
      this.options = {
        legend: {
          position: 'bottom',
          color: '#aaa',
          labels: {
            boxWidth: 0,
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    } else {
      this.type = 'bar';
      this.data = {
        labels: numberOfep,
        datasets: [
          {
            label: 'Episode No',
            data: rating,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      };
      this.options = {
        legend: {
          position: 'bottom',
          color: '#aaa',
          labels: {
            boxWidth: 0,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    }
  }
  episodeClickHandler(ep, mdbId, event, i) {
    if (!this.currentMovie.episodes[0][this.subtitle][i]) {
      console.log('link not available');
      event.preventDefault();
      this._snackBar.open('Link is not available right now', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar'],
      });
      return;
    }
    console.log('clicked episode', ep, mdbId);
    localStorage.setItem(mdbId, ep);
    // this.ionStorage.setLastWatchedep(mdbId, ep);
    this.lastWatchedEP = ep;
  }
  handleToggle() {
    this.toggleSubtitleEng = !this.toggleSubtitleEng;
    if (this.toggleSubtitleEng === true) {
      this.subtitle = 'english';
    } else {
      this.subtitle = 'burmese';
    }
  }
}
