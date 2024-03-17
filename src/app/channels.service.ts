import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private http: HttpClient) { }

  getChannels(): Observable<any> {

    let apck: string = '69618bae51ea8f44f4d356f892889261';
    if(localStorage.getItem('xa88') == '1'){
      return this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/chtestprem.json`, {responseType: 'json' });
    }else{
      return this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/chtest.json`, {responseType: 'json' });
    }
  }

  getParrilla(): Observable<any> {
    return this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/4f43dd901c609825ca8107062b0c8178.json`, {responseType: 'json' });
  }

  getChilevision(): Observable<any> {
    return this.http.get(`https://www.chilevision.cl:8080/token.php/ms_player_src_01/live_1/63ee47e1daeeb80a30d98ef4/1702807971649.json`, {responseType: 'json' });
  }

  getCanal13(): Observable<any> {
    return this.http.get(`https://us-central1-canal-13-stream-api.cloudfunctions.net/media/token`, {responseType: 'json' });
  }

  getStatusChannels(): Observable<any> {
    return this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/estadoCanales.json`, {responseType: 'json' });
  }

  getCanalesPrincipales(): Observable<any> {
    return this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/idcanalesprincipales.json`, {responseType: 'json' });
  }
}
