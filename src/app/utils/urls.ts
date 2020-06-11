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
  static getAllCampaign = Urls.baseUrl + 'CampaignApi/GetAllCampaigns';
  static getCampaignById = Urls.baseUrl + 'CampaignApi/GetCampaign?id=';
  static addCampaign = Urls.baseUrl + 'CampaignApi/InsertCampaign';
  static updateCampaign = Urls.baseUrl + 'CampaignApi/UpdateCampaign';
  static deleteCampaign = Urls.baseUrl + 'CampaignApi/DeleteCampaign?id=';
  static getBrands = Urls.baseUrl + 'BrandApi/GetAllBrands';
  static getMarketingType = Urls.baseUrl + 'CampaignApi/GetAllMTypes';
  static getStrategy = Urls.baseUrl + 'CampaignApi/GetAllStrategies';
  static getAllTemplate = Urls.baseUrl + 'TemplateApi/GetAllTemplates';
  static getCampaignStatus = Urls.baseUrl + 'CampaignApi/GetAllCampaignStatuses';
  static getAllCustomers = Urls.baseUrl + 'CustomerApi/GetAllCustomers';
  static getCustomerByCampaign = Urls.baseUrl + 'CustomerApi/GetCustomersByCampaignId?campaignId=';
  static getCampaignDetail = Urls.baseUrl + 'ResponseApi/GetResponseByCampaignId?id=';
  static uploadCustomer = Urls.baseUrl + 'CustomerApi/ExcelUpload';
}
