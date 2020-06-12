import {UserModel} from './userModel';
import {CampaignStatusModel} from './campaignStatusModel';
import {MarketingTypeModel} from './marketingTypeModel';
import {TemplateModel} from './templateModel';
import {MarketingStrategyModel} from './marketingStrategyModel';
import {BrandModel} from './brandModel';

export class CampaignModel {
  CampaignId?: number;
  CampaignName: string;
  BrandId: number;
  Brand: BrandModel;
  Start_Date: Date;
  End_Date: Date;
  Stop_Date?: Date;
  Resume_Date?: Date;
  CampaignBudget: number;
  ExpectedRevenue: number;
  CreatedOn: Date;
  ModifiedOn: Date;
  CreatedBy: Date;
  User?: UserModel;
  CampaignStatusId: number;
  CampaignStatus: CampaignStatusModel;
  MarketingTypeId: number;
  MarketingType: MarketingTypeModel;
  TemplateId: number;
  Template: TemplateModel;
  MarketingStrategyId: number;
  MarketingStrategy: MarketingStrategyModel;
  TotalUser?: number;
}
