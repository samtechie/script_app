import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/admin/user/";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[], usersCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, users: any, maxUsers: number }>(BACKEND_URL + queryParams)
      .pipe(map(userData => {
        return {
          users: userData.users.map(user => {
            return {
              email: user.email,
              password: user.password,
              id: user._id
            };
          }), maxUsers: userData.maxUsers
        };
      }))
      .subscribe((modifiedUsersData) => {
        this.users = modifiedUsersData.users;
        this.usersUpdated.next({
          users: [...this.users]
          , usersCount: modifiedUsersData.maxUsers
        });
      });
  }

  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{ _id: string, email: string, password: string }>(BACKEND_URL + id);
    //return {...this.scripts.find(s => s.id === id)};
  }

  addUser(email: string, password: string) {
    const user: User = { id: null, email: email, password: password };
    this.http.post<{ message: string, scriptId: string }>(BACKEND_URL, script)
      .subscribe((responseData) => {
        this.router.navigate(["/admin/users/"]);
      });

  }

  updateUser(id: string, email: string, password: string) {
    const user: User = { id: id, email: email, password: password }
    this.http.put(BACKEND_URL + id, user)
      .subscribe(response => {
        this.router.navigate(["/admin/users/"]);
      });
  }

  deleteUser(scriptId: string) {
    return this.http.delete(BACKEND_URL + scriptId)

  }
}
