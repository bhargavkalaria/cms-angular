import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailTemplateService} from '../../../services/email-template.service';
import {NotificationService} from '../../../services/notification.service';
import {Constant} from '../../../utils/constant';

@Component({
  selector: 'app-email-add-edit',
  templateUrl: './email-add-edit.component.html',
  styleUrls: ['./email-add-edit.component.scss']
})
export class EmailAddEditComponent implements OnInit {
  emailTemplate: FormGroup;
  today = new Date();
  isLoading = true;
  editTemplateId;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private emailTemplateService: EmailTemplateService,
              private router: Router) {
    this.emailTemplate = this.formBuilder.group({
      TemplateId: [],
      TemplateName: [null, [Validators.required]],
      TemplateData: [null, [Validators.required]],
      CreatedDate: [this.today, [Validators.required]],
      LastUpdated: [this.today, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.editTemplateId = +this.activatedRoute.snapshot.params.id;
    if (this.editTemplateId) {
      this.getEmailTemplateById();
    } else {
      this.isLoading = false;
    }
  }

  addTemplate() {
    if (this.editTemplateId) {
      this.emailTemplate.value.LastUpdated = this.today;
      this.emailTemplateService.updateEmailData(this.emailTemplate.value).then(template => {
        this.router.navigate(['dashboard', 'email-template']);
        this.notificationService.createNotification(
          this.notificationService.notificationSuccess,
          Constant.updateEmailStatusSuccess,
          this.emailTemplate.value.TemplateName + Constant.updateEmailStatusLongSuccess
        );
      }).catch(error => {
        this.notificationService.createNotification(
          this.notificationService.notificationError,
          Constant.updateEmailError,
          Constant.somethingWentWrong
        );
      });
    } else {
      this.emailTemplateService.addEmailTemplate(this.emailTemplate.value).then(template => {
        this.router.navigate(['dashboard', 'email-template']);
        this.notificationService.createNotification(
          this.notificationService.notificationSuccess,
          Constant.addEmailTemplateShortMessage,
          this.emailTemplate.value.TemplateName + Constant.addEmailStatusSuccess
        );
      }).catch(error => {
        console.log(error);
        this.notificationService.createNotification(
          this.notificationService.notificationError,
          Constant.addEmailError,
          Constant.somethingWentWrong
        );
      });
    }
  }

  getEmailTemplateById() {
    this.emailTemplateService.getEmailTemplateById(this.editTemplateId).then(template => {
      this.emailTemplate.patchValue(template);
      this.isLoading = false;
    }).catch(error => {
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.errorEmailTemplate,
        Constant.somethingWentWrong
      );
    });
  }
}
