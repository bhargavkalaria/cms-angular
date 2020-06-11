import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Constant} from '../../utils/constant';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  registerUser: FormGroup;
  forgotPassword: FormGroup;
  resetPassword: FormGroup;
  emailError = Constant.emailError;
  passwordError = Constant.passwordError;
  firstNameError = Constant.firstName;
  lastNameError = Constant.lastName;
  loadingButton = false;
  status = 'login';
  resetId;

  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.userForm = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      RememberMe: [false],
    });
    this.registerUser = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      Role: [null, [Validators.required]],
      FName: [null, [Validators.required]],
      LName: [null, [Validators.required]],
    });
    this.forgotPassword = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('/login')) {
      this.status = 'login';
    } else if (this.router.url.includes('/register-user')) {
      this.status = 'register-user';
    } else if (this.router.url.includes('/forgot-password')) {
      this.status = 'forgot-password';
    } else if (this.router.url.includes('reset-password')) {
      this.resetId = this.activatedRoute.snapshot.queryParams.id;
      this.status = 'reset-password';
    }
    this.userService.checkLogin();
  }

  doLogin(): void {
    if (this.userForm.valid) {
      if (this.userForm.value.password.trim()) {
        this.userService.login(this.userForm.value).then(result => {
          this.userService.setUserData(result, this.userForm.value.RememberMe);
        }).catch(error => {
          this.notificationService.createNotification(
            this.notificationService.notificationError,
            Constant.loginError,
            error.error);
        });
      } else {
        this.notificationService.createNotification(
          this.notificationService.notificationError,
          Constant.shortPasswordTrimMessage,
          Constant.passwordTrimMessage);
      }
    }
  }

  setForgotPassword() {
    this.userService.forgotPassword(this.forgotPassword.value.email).then(result => {
      console.log(result)
      this.router.navigate(['login']);
      this.notificationService.createNotification(
        this.notificationService.notificationSuccess,
        Constant.successForgotShortMessage,
        Constant.successForgotLongMessage
      );
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.forgotError,
        error.error);
    });
  }

  registerNewUser(): void {
    this.userService.addNewUser(this.registerUser.value).then(result => {
      this.router.navigate(['login']);
      this.notificationService.createNotification(
        this.notificationService.notificationSuccess,
        Constant.successRegisterUserShortMessage,
        Constant.successRegisterUserLongMessage
      );
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.errorRegisterUserShortMessage,
        Constant.somethingWentWrong
      );
    });
  }
}
