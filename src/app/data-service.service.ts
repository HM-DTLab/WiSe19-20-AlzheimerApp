import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TextContentData } from './text-content-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private isTextAvilableUrl = 'api/getTextContentForId';

  constructor(
    private http: HttpClient
  ) {}
  getTextContent(id: number): Observable<TextContentData> {
    const url = this.isTextAvilableUrl.concat(id.toString());
    return this.http.get<TextContentData>(url);
  }

}
