import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getData(key: string) {
    return localStorage.getItem(key);
  }

  setData(key: string, data: string) {
    localStorage.setItem(key, data);
  };
}
