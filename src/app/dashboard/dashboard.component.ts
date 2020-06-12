import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {UserService} from '../services/user.service';
import {Constant} from '../utils/constant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  resetPasswordModelVisible = false;
  resetOldPassword = Constant.resetOldPassword;
  resetNewPassword = Constant.resetNewPassword;
  resetPassword: FormGroup;
  isConfirmLoading = false;
  userName = '';
  role = '';

  constructor(private modalService: NzModalService,
              public userService: UserService,
              private fb: FormBuilder,
              private notificationService: NotificationService) {
    this.resetPassword = this.fb.group({
      cur_pwd: ['', [Validators.required]],
      new_pwd: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userName = this.userService.getUserName();
    this.role = this.userService.checkRoles();
  }

  resetPasswordCancel(): void {
    this.resetPasswordModelVisible = false;
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

  resetPasswordOk(): void {
    this.isConfirmLoading = true;
    this.resetPassword.value.email = this.userService.getUserEmail();
    this.userService.resetPassword(this.resetPassword.value).then(result => {
      this.resetPasswordCancel();
      this.isConfirmLoading = false;
      this.notificationService.createNotification(
        this.notificationService.notificationSuccess,
        Constant.successResetPasswordShortMessage,
        Constant.successResetPasswordLongMessage,
      );
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.errorResetPasswordLongMessage,
        error.error,
      );
    });
  }

  showResetPasswordModal(): void {
    this.resetPassword.reset();
    this.resetPasswordModelVisible = true;
  }

  logout() {
    this.userService.logoutUser();
  }
}
