import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router) {
  }

  logoutUser() {
    this.router.navigate(['login']);
  }
}
