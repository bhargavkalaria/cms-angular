import {Component, OnInit} from '@angular/core';
import {EmailTemplateService} from '../../../services/email-template.service';
import {TemplateModel} from '../../../models/templateModel';
import {CampaignModel} from '../../../models/campaignModel';
import {Constant} from '../../../utils/constant';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {
  emailList: TemplateModel[];
  isLoading = true;
  listOfDisplayData: TemplateModel[];
  searchValue = '';
  visible = false;
  isEmailTemplateModalVisible = false;
  modalTitle;
  modalBody;

  constructor(private emailTemplateService: EmailTemplateService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getAllEmailList();
  }

  getAllEmailList() {
    this.emailTemplateService.getEmailTemplate().then((email: any) => {
      console.log(email);
      this.isLoading = false;
      this.emailList = [...email];
      this.listOfDisplayData = [...this.emailList];
    }).catch(error => {
      console.log(error);
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.emailList.filter((item) => item.TemplateName.toLowerCase().indexOf(this.searchValue) !== -1);
  }

  deleteEmailTemplate(data) {
    this.isLoading = true;
    this.emailTemplateService.deleteEmailTemplate(data.TemplateId).then(result => {
      this.isLoading = true;
      this.getAllEmailList();
      this.notificationService.createNotification(
        this.notificationService.notificationSuccess,
        Constant.successCampaignDeleteShortMessage,
        data.TemplateName + Constant.successQuickCampaignDeleteLongMessage
      );
    }).catch(error => {
      this.isLoading = false;
      this.notificationService.createNotification(
        this.notificationService.notificationError,
        Constant.emailTemplateDeleteError,
        Constant.somethingWentWrong
      );
    });
  }

  previewEmailTemplate(data: TemplateModel) {
    this.modalTitle = data.TemplateName;
    this.isEmailTemplateModalVisible = true;
    this.modalBody = data.TemplateData;
  }

  hideModal() {
    this.isEmailTemplateModalVisible = false;
  }
}
