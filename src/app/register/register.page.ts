import { NgModule } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormsModule ,Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
],
declarations: [RegisterPage]
})
export class RegisterPage implements OnInit {
  signup_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signup_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.'},
      { type: 'pattern', message: 'Please enter a valid email.'}
    ],
    'password': [
      { type: 'required', message: 'Password is required.'},
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  }

  registerUser(value){
    this.authService.registerUser(value)
    .then(
      res => {
        console.log(res)
        this.errorMessage = "";
        this.navCtrl.navigateForward('/dashboard');
      }, err => {
        this.errorMessage = err.message
      }
    )
  }

}
