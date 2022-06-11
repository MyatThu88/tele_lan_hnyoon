import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class IronStorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }
  setLastWatchedep(mdbId, epNo) {
    this._storage?.set(mdbId, epNo);
  }
  getLastWatchedep(mdbId) {
    return this._storage?.get(mdbId);
  }
}
