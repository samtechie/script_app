import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  form: FormGroup;
  private mode = 'create';
  private userId: string;
  user: User;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }



}
