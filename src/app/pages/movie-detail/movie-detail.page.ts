import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/assets/mockDb/db';
import { TmdbService } from 'src/app/services/tmdb.service';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movieList = Movie;
  currentMovie;
  maxLength: number = 110;
  episodes: any[] = [];
  tmdbInfo;
  castSlideOpts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    shadow: true,
  };
  type;
  data;
  options;
  constructor(
    private actvRoute: ActivatedRoute,
    private router: Router,
    private tmdb: TmdbService
  ) {}

  ngOnInit() {
    const movieId = this.actvRoute.snapshot.params['id'];
    this.getMovieDetail(movieId);
    console.log('aa', this.episodes);
    this.showChart(this.episodes);
  }

  async getMovieDetail(movieId) {
    this.currentMovie = this.movieList[movieId - 1]; //mock data
    await this.tmdb
      .getMovieDetail(this.currentMovie.mdbId, this.currentMovie.type)
      .subscribe((data: any) => {
        console.log('real tmdb data', data);
        this.tmdbInfo = data;
        if (this.currentMovie.type == 'tv') {
          this.tmdb
            .getEpisodeDetail(
              this.currentMovie.mdbId,
              1,
              data.seasons[0].episode_count
            )
            .subscribe((episode: any) => {
              this.episodes.push(episode);

              if (this.episodes.length == data.seasons[0].episode_count) {
                console.log(episode);
                this.showChart(this.episodes);
              }
            });
        }
      });
  }

  showAll(length) {
    this.maxLength = length;
  }

  handleClick(epNo) {
    console.log(epNo);
  }

  onPersonDetail(id) {
    this.router.navigate(['person-detail', id]);
  }
  showChart(episodes) {
    let rating = [];
    let numberOfep = [];
    let popOutCount;
    let epList = [...episodes];
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
      this.tmdbInfo.next_episode_to_air.season_number == '1'
    ) {
      popOutCount =
        this.tmdbInfo.seasons[0].episode_count -
        this.tmdbInfo.last_episode_to_air.episode_number;
      epList.splice(
        this.tmdbInfo.last_episode_to_air.episode_number,
        popOutCount
      );
      chartType = 'horizontal';
      console.log(episodes);
    }

    for (const key in epList) {
      numberOfep.push(parseInt(key) + 1);
      console.log(key);

      rating.push(
        epList[key].id % 10 < 4
          ? (epList[key].id % 10) + 3
          : epList[key].id % 10
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
}
