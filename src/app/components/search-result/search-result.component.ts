import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchWord;
  searchType;
  skip = 0;
  searchResult = [];
  @Output() onLoadmoreComplete = new EventEmitter<string>();
  colorList = [
    '#4caf50',
    '#ff8a80',
    '#80d8ff',
    '#ffe57f',
    '#673ab7',
    '#4caf50',
    '#ff8a80',
    '#80d8ff',
    '#ffe57f',
    '#673ab7',
  ];
  movieGenre = [
    'action',
    'shounen',
    'adventure',
    'fantasy',
    'kids',
    'drama',
    'crime',
    'comedy',
    'mystery',
    'survival',
    'drama',
  ];
  subscription: Subscription;
  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.search();
  }
  search() {
    this.subscription = this.searchService.searchEventEmitter.subscribe(
      (data: any) => {
        if (data.searchWord.length > 0) {
          console.log(data);
          this.searchWord = data.searchWord;
          this.searchType = data.type;
          this.fetchData(this.searchWord, this.searchType);
        } else if (data.loadmore === true) {
          this.skip++;
          this.fetchData(this.searchWord, this.searchType, this.skip);
        } else {
          console.log('not searching', data.loadmore);
        }
      }
    );
  }
  fetchData(searchWord, type, skip = 0) {
    this.searchService
      .findSearchWord(searchWord, type, skip)
      .subscribe((res: any) => {
        console.log(res);
        if (skip > 0) {
          res.data.map((m) => {
            this.searchResult.push(m);
          });
        } else {
          this.searchResult = res.data;
        }

        this.onLoadmoreComplete.emit('true');
      });
  }
  selectColor(genre: String) {
    let index = this.movieGenre.findIndex((gen) => gen === genre);
    return this.colorList[index];
  }
  movieDetail(id) {
    this.router.navigate(['movie-detail', id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
