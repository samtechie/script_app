import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit ,OnDestroy{

  users: User[] = [];
  isLoading = false;
  private usersSub: Subscription;
  private authStatusSub: Subscription;
  userId: string;
  role: string;
  userIsAuthenticated = false;





  constructor(public usersService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {
    //this.isLoading = true;

    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();

    this.usersService.getUsers();
    this.usersSub = this.usersService.getUsersUpdatedListener()
      .subscribe((users: User[]) => {
        this.isLoading = false;
        this.users = users;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(
        isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
          this.role = this.authService.getRole();


        });
  }

  onDelete(userId: string) {
    this.usersService.deleteUser(userId);
  }
  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.authStatusSub.unsubscribe();

  }

}
