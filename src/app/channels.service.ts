import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private http: HttpClient) { }

  getChannels(): Observable<any> {
    return this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/69618bae51ea8f44f4d356f892889261.json`, {responseType: 'json' });
  }

  getParrilla(): Observable<any> {
    return this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/4f43dd901c609825ca8107062b0c8178.json`, {responseType: 'json' });
  }
}
