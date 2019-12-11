import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const getTextContentForId0 = {
      id: 0,
      title: 'Title0',
      text: 'Lorem',
      hasText: true
    };
    const getTextContentForId1 = {
      id: 1,
      title: 'Title1',
      text: '',
      hasText: false
    };

    return {
      getTextContentForId0,
      getTextContentForId1
    };
  }
}
