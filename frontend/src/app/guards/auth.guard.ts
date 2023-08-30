import { ActivatedRouteSnapshot,Router,RouterStateSnapshot,UrlTree,CanActivate } from '@angular/router';
import {Observable} from 'rxjs';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate {

  constructor(private userService:UserService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.userService.currentUser.token) return true;

    this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
    return false;
  }

}
