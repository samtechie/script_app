import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private mode = 'create';
  private userId: string;
  user: User;
  private authStatusSub: Subscription;


  constructor(public usersService: UsersService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        //this.isLoading = false;
      }
    );

    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        //this.isLoading = true;
        this.usersService.getUser(this.userId).subscribe(userData => {
          //this.isLoading = false;
          this.user = {
            id: userData._id,
            email: userData.email,
            password: userData.password
          };
          this.form.setValue({
            email: this.user.email,
            password: this.user.password
          });
        });
      } else {
        this.mode = 'create';
        this.userId = null;
      }
    })
  }

  onSaveUser(): void {
    if (this.form.invalid) {
      return;
    }
    //this.isLoading = true;
    if (this.mode === 'create') {
      this.usersService.addUser(this.form.value.email, this.form.value.password);
    } else {
      this.usersService.updateUser(this.userId, this.form.value.email, this.form.value.password);
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }


}
