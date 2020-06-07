import {environment} from '../../environments/environment';

export class Urls {
  static baseUrl = environment.apiUrl;
  static login = Urls.baseUrl + 'LoginApi/Login';
  static addUser = Urls.baseUrl + 'LoginApi/Register';
  static resetPassword = Urls.baseUrl + 'LoginApi/ResetPassword';
  static forgotPassword = Urls.baseUrl + 'LoginApi/ForgotPassword?Email=';
  static getBasicDashBoardDetails = Urls.baseUrl + 'DashBoardApi/GetBasicDashBoardDetails';
  static getCampaignByMonth = Urls.baseUrl + 'DashBoardApi/GetCampaignByMonthOrYear';
  static getTopFiveBrandByBudget = Urls.baseUrl + 'DashBoardApi/GetTopFiveBrandByBudget';
  static getCampaignStatusList = Urls.baseUrl + 'DashBoardApi/GetCampaignStatusList';
  static getTopThreeResponse = Urls.baseUrl + 'DashBoardApi/GetTopThreeResponse';
}
