import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Constant} from '../../utils/constant';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {UserService} from '../../services/user.service';

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
  minLengthPassword = Constant.minLengthPassword;
  loadingButton = false;
  status = 'login';
  resetId;

  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private notification: NzNotificationService,
              private activatedRoute: ActivatedRoute,
  ) {
    this.userForm = this.formBuilder.group({
      UId: [null],
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      Role: [null],
      FName: [null],
      LName: [null],
      RememberMe: [false],
      viewCampaignAccess: [false],
      addCampaignAccess: [false],
      editCampaignAccess: [false],
      deleteCampainAccess: [false],
      uploadCustomerAccess: [false],
      addQuickCampaignAccess: [false],
      viewQuickCampaignAccess: [false],
      addTemplateAccess: [false],
      viewTemplateAccess: [false],
      editTemplateAccess: [false],
      deleteTemplateAccess: [false],
      addBrandAccess: [false],
      editBrandAccess: [false],
      viewBrandAccess: [false],
      deleteBrandAccess: [false],
      addUserAccess: [false],
      hasReportAccess: [false],
    });
    this.registerUser = this.formBuilder.group({
      UId: [null],
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      Role: [null, [Validators.required]],
      FName: [null, [Validators.required]],
      LName: [null, [Validators.required]],
      RememberMe: [false],
      viewCampaignAccess: [false],
      addCampaignAccess: [false],
      editCampaignAccess: [false],
      deleteCampainAccess: [false],
      uploadCustomerAccess: [false],
      addQuickCampaignAccess: [false],
      viewQuickCampaignAccess: [false],
      addTemplateAccess: [false],
      viewTemplateAccess: [false],
      editTemplateAccess: [false],
      deleteTemplateAccess: [false],
      addBrandAccess: [false],
      editBrandAccess: [false],
      viewBrandAccess: [false],
      deleteBrandAccess: [false],
      addUserAccess: [false],
      hasReportAccess: [false],
    });
    this.forgotPassword = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.resetPassword = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmResetPassword]],
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
  }

  confirmResetPassword(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.resetPassword.controls.newPassword.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  doLogin(): void {
    if (this.userForm.valid) {
      if (this.userForm.value.password.trim()) {
        this.router.navigate(['dashboard']);
      } else {
        this.notification.create(
          'error',
          'Password Error',
          Constant.passwordTrimMessage, {nzPlacement: 'bottomRight'}
        );
      }
    }
  }

  setForgotPassword() {

  }

  userResetPassword() {

  }

  validateConfirmPassword(): void {
    this.resetPassword.controls.confirmPassword.updateValueAndValidity();
  }
}
