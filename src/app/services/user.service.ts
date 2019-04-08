import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath: string = '/users';

  users: AngularFirestoreCollection<User>; //  list of objects
  user: AngularFirestoreDocument<User>; //   single object

  constructor(private db: AngularFirestore) {
    this.users = db.collection(this.basePath);
   }

  createUser(user: User): void {
    this.users.add(user)
    .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }
}
