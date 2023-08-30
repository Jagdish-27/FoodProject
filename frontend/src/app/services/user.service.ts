import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { ORDERS_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/url';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const User_Key = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable?:Observable<User>;
  constructor(private http:HttpClient,private router:Router) { 
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
          console.log(user);
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          Swal.fire({
            icon:'success',
            title:'Login Successful',
            text:`Welcome to Foodmine ${user.name}!`
          })
        },
        error:(errorResponse) =>{
          Swal.fire({
            icon:'error',
            title:'Error',
            text:`Login failed ${errorResponse.error}!`
          })
        }
      })
    )
  };

  getOrder(){
    return this.http.get(ORDERS_URL);
  }

  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          Swal.fire({
            icon:'success',
            title:'Register Successful',
            text:`Welcome to Foodmine ${user.name}!`
          })
        },
        error:(errorResponse)=>{
          Swal.fire({
            icon:'error',
            title:'Error',
            text:`Register failed ${errorResponse.error}!`
          })
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(User_Key);
    this.router.navigate(['/login'])
    // window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(User_Key,JSON.stringify(user));
  };

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(User_Key);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
