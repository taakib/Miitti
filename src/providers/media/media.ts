import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  username: string;
  password: string;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  public loggedIn: boolean;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  public logout() {
    localStorage.removeItem('token');
    console.log('User ' + this.username + ' logged out.');
  }

  /**
   * Login
   *
   * @param {User} user
   * @returns {Observable<any>}
   */
  public login(user: User): Observable<any> {
    interface LoginResponse {
      message: string;
      token: string;
      user: User;
    }
    return this.http.post<LoginResponse>(this.apiUrl + '/login', user);
  }

  getUserData(token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get(this.apiUrl + '/users/user', settings);
  }

  postUserFile(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.post(this.apiUrl + '/media', formData, settings);
  }

  public register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  getAllMedia() {
    return this.http.get<Array<string>>(this.apiUrl + '/media');
  }

  getNewestFile() {
    return this.http.get(this.apiUrl + this.mediaUrl + '?limit=1')
  }

  getSingleMedia(id) {
    return this.http.get<Array<string>>(this.apiUrl + '/media/' + id);
  }

  getTagByFile(id) {
    return this.http.get<Array<object>>(this.apiUrl + '/tags/file/' + id);
  }
}
