import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deleteUser: any;
  getUsers: any;
  createUser: any;
  updateUser(userId: number, value: any) {
    throw new Error('Method not implemented.');
  }
  getUserById(userId: number) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
