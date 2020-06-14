import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivateChild {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDetails: UserModel = this.userService.getUserDetails();
    if (state.url.indexOf('/dashboard/campaign') !== -1) {
      if (userDetails.viewCampaignAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/campaign/create') !== -1) {
      if (userDetails.addCampaignAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/campaign/edit') !== -1) {
      if (userDetails.editCampaignAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/quick-campaign-list') !== -1) {
      if (userDetails.viewQuickCampaignAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/quick-campaign-list/create') !== -1) {
      if (userDetails.addQuickCampaignAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/upload-spreadsheet') !== -1) {
      if (userDetails.uploadCustomerAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/brand-list') !== -1) {
      if (userDetails.viewBrandAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/brand-list/create') !== -1) {
      if (userDetails.addBrandAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/brand-list/edit') !== -1) {
      if (userDetails.editBrandAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/email-template') !== -1) {
      if (userDetails.viewTemplateAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/email-template/create') !== -1) {
      if (userDetails.addTemplateAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/email-template/edit') !== -1) {
      if (userDetails.editTemplateAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/report') !== -1) {
      if (userDetails.hasReportAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else if (state.url.indexOf('/dashboard/graph') !== -1) {
      if (userDetails.hasReportAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      return true;
    }
  }

}
