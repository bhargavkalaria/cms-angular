import {Injectable} from '@angular/core';
import {Constant} from '../utils/constant';
import {NzConfigService, NzNotificationService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationSuccess = 'success';
  notificationWarning = 'warning';
  notificationInfo = 'info';
  notificationError = 'error';

  constructor(private notification: NzNotificationService) {

  }

  createNotification(type, shortMessage, longMessage, option?) {
    this.notification.create(
      type,
      shortMessage,
      longMessage,
    );
  }
}
