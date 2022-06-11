import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
  person;
  MovieSlideOpts = {
    slidesPerView: 2.5,
    spaceBetween: 10,
    shadow: true,
  };
  formatSubtitle = () => {
    return 'Popularity';
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tmdb: TmdbService
  ) {}

  ngOnInit() {
    const personId = this.activatedRoute.snapshot.params['id'];
    this.getPersonDetail(personId);
  }
  onMovieDetail(id: number) {
    console.log('aa');
  }

  getAge(birthday) {
    const currYear = new Date().getFullYear();
    const bdYear = parseInt(birthday.slice(0, 4));
    return currYear - bdYear;
  }
  private getPersonDetail(id: number) {
    this.tmdb.getPersonDetail(id).subscribe((res) => {
      this.person = res;
      console.log('peron info ', this.person);
    });
  }
}
