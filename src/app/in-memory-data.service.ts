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
      text: 'Lorem ipsum',
      hasText: true
    };
    const getTextContentForId1 = {
      id: 1,
      title: 'Title1',
      text: '',
      hasText: false
    };
    const getTextContentForId2 = {
      id: 2,
      title: 'Kafeemaschine',
      text: 'Stecke einen Kaffeefilter in den Filterkorb. Du kannst Natur- oder gebleichte Filter nehmen, nur keine, die Krebs erregen. Billige Filter verstopfen durch das Kaffeepulver leichter.\n' +
            'Viele Kaffeemaschinen kommen mit eigenem Netzfilter. Wenn einer verfügbar ist, ist das normalerweise die einfachste und umweltfreundlichste Variante. Verwende lieber einen speziell für deine Maschine vorgesehenen Filter, als einen einfachen aus Papier.',
      hasText: true
    };

    return {
      getTextContentForId0,
      getTextContentForId1,
      getTextContentForId2
    };
  }
}
