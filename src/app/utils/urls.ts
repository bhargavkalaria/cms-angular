import {environment} from '../../environments/environment';

export class Urls {
  static baseUrl = environment.apiUrl;
  static login = Urls.baseUrl + 'LoginApi/Login';
  static addUser = Urls.baseUrl + 'LoginApi/Register';
  static resetPassword = Urls.baseUrl + 'LoginApi/ResetPassword';
  static forgotPassword = Urls.baseUrl + 'LoginApi/ForgotPassword?Email=';
  static getBrands = Urls.baseUrl + 'BrandApi/GetAllBrands';
  static getBrandById = Urls.baseUrl + 'BrandApi/GetBrand?id=';
  static addBrand = Urls.baseUrl + 'BrandApi/InsertBrand';
  static updateBrand = Urls.baseUrl + 'BrandApi/UpdateBrand';
  static deleteBrand = Urls.baseUrl + 'BrandApi/DeleteBrand/';
  static getAllCampaigns = Urls.baseUrl + 'CampaignApi/GetAllCampaigns';
  static getAllQuickCampaigns = Urls.baseUrl + 'QuickCampaignApi/GetAllQuickCampaigns';
  static GetCampaignReportByDate = Urls.baseUrl + 'ReportApi/GetCampaignReportByDate';
  static GetCampaignReportById = Urls.baseUrl + 'ReportApi/GetCampaignReportById?id=';
  static GetCampaignReportByType = Urls.baseUrl + 'ReportApi/GetCampaignReportByType';
  static GetQuickCampaignReportByDate = Urls.baseUrl + 'ReportApi/GetQuickCampaignReportByDate';
  static GetQuickCampaignReportById = Urls.baseUrl + 'ReportApi/GetQuickCampaignReportById?id=';
  static GetQuickCampaignReportByType = Urls.baseUrl + 'ReportApi/GetQuickCampaignReportByType';
}
