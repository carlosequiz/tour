import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { UserService } from './user.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  registerUser(value){
    return new Promise<any>((resolve, reject) => {

      const newUser: User = {
        email: value.email,
      }
  
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(this.userService.createUser(newUser)),
        err => reject(err)
      )
    })
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  logoutUser(value) {
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          console.log('LOGOUT!!');
          resolve();
        }).catch((error) => {
          reject(); 
        });
      }
    })
  }

  getUserDetails() {
    return firebase.auth().currentUser;
  }

}
