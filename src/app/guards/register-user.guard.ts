import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserModel} from '../models/userModel';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDetails: UserModel = this.userService.getUserDetails();
    if (state.url.indexOf('/register-user') !== -1) {
      if (userDetails.addUserAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    }

  }
}
