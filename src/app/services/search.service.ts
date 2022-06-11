import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // baseUrl = 'https://telelanhnyoon.herokuapp.com';
  baseUrl = 'http://localhost:5000';
  searchEventEmitter = new Subject<{}>();
  bottomDrawerEventEmitter = new Subject<{}>();
  header = new HttpHeaders();
  constructor(private http: HttpClient) {}

  emitSearchEvent(searchWord: String, type: string, loadmore?: boolean) {
    this.searchEventEmitter.next({ searchWord, type, loadmore });
  }
  findSearchWord(searchWord, type, skip: number = 0) {
    return this.http.get(
      `${this.baseUrl}/api/v1/${type}/search/${searchWord}/${skip}`
    );
  }
  emitBottomDrawerEvent() {
    this.bottomDrawerEventEmitter.next({ emit: true });
  }
}
