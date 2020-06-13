import {UserModel} from './userModel';
import {TemplateModel} from './templateModel';

export class QuickCampaignModel {
  QuickCampaignId: number;
  QuickCampaignName: string;
  Start_Date: Date;
  CreatedOn: Date;
  ModifiedOn: Date;
  CreatedBy?: number;
  User: UserModel;
  CampaignBudget: number;
  ExpectedRevenue: number;
  TemplateId: number;
  Template: TemplateModel;
}
