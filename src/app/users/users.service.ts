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
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) { }



  getUsers() {
    this.http
      .get<{ message: string; users: any }>(BACKEND_URL)
      .pipe(
        map(userData => {
          return userData.users.map(user => {
            return {
              email: user.email,
              password: user.password,
              id: user._id
            };
          });
        })
      )
      .subscribe(transformedUsers => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{ _id: string, email: string, password: string }>(BACKEND_URL + id);
  }

  addUser(email: string, password: string) {
    const user: User = { id: null, email: email, password: password };
    this.http.post<{ message: string, scriptId: string }>(BACKEND_URL, user)
      .subscribe((responseData) => {
        this.router.navigate(["/admin/user/"]);
      });

  }

  updateUser(id: string, email: string, password: string) {
    const user: User = { id: id, email: email, password: password }
    this.http.put(BACKEND_URL + id, user)
      .subscribe(response => {
        this.router.navigate(["/admin/user/"]);
      });
  }

  deleteUser(userId: string) {
    return this.http.delete(BACKEND_URL + userId)
      .subscribe(() => {
        const updatedUsers = this.users.filter(user => user.id !== userId);
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      });

  }
}
