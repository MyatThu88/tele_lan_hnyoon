import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, mergeMap } from 'rxjs/operators';
import { range } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly params = {
    api_key: 'b87895ad5c980fb64807236298c769bb',
    language: 'en-En',
  };
  constructor(private http: HttpClient) {}

  getMovieDetail(id: number, type: string) {
    const append = '&append_to_response=credits';
    console.log(
      'movie detail url',
      `${this.baseUrl}/${type}/${id}${this.getParams()}${append}`
    );
    return this.http.get(
      `${this.baseUrl}/${type}/${id}${this.getParams()}${append}`
    );
  }

  getEpisodeDetail(id, season: number, totalEpisode: number, lastEpInfo: any) {
    const append = '&append_to_response=credits';
    totalEpisode =
      lastEpInfo.season_number === season
        ? lastEpInfo.episode_number
        : totalEpisode;
    const episodeObs = range(1, totalEpisode);
    return episodeObs.pipe(
      concatMap((data) =>
        this.http.get(
          `${
            this.baseUrl
          }/tv/${id}/season/${season}/episode/${data}${this.getParams()}${append}`
        )
      )
    );
  }

  getPersonDetail(id: number) {
    const append = '&append_to_response=credits';
    return this.http.get(
      `${this.baseUrl}/person/${id}${this.getParams()}${append}`
    );
  }

  private getParams(params?: any) {
    const obj = { ...this.params, ...params };
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return '?' + str.join('&');
  }
}
