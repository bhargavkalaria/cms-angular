export class UserModel {
  UId: number;
  Email: string;
  Password: string;
  Role: string;
  FName: string;
  LName: string;
  RememberMe: boolean;
  viewCampaignAccess: boolean;
  addCampaignAccess: boolean;
  editCampaignAccess: boolean;
  deleteCampainAccess: boolean;
  uploadCustomerAccess: boolean;
  addQuickCampaignAccess: boolean;
  viewQuickCampaignAccess: boolean;
  addTemplateAccess: boolean;
  viewTemplateAccess: boolean;
  editTemplateAccess: boolean;
  deleteTemplateAccess: boolean;
  addBrandAccess: boolean;
  editBrandAccess: boolean;
  viewBrandAccess: boolean;
  deleteBrandAccess: boolean;
  addUserAccess: boolean;
  hasReportAccess: boolean;
}
