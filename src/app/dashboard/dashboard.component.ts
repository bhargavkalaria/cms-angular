import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;

  constructor(private modalService: NzModalService, public userService: UserService) {
  }

  ngOnInit(): void {
  }

  showLogoutConfirmation(): void {
    this.modalService.confirm({
      nzTitle: 'Do you want to logout?',
      nzOkText: 'Logout',
      nzOnOk: () => this.logout(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  logout() {
    this.userService.logoutUser();
  }
}
