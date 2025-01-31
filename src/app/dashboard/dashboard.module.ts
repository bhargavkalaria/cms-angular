import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {HomeComponent} from './home/home.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {BrandListComponent} from './brands/brand-list/brand-list.component';
import {CampaignListComponent} from './campaign/campaign-list/campaign-list.component';
import {CampaignDetailComponent} from './campaign/campaign-detail/campaign-detail.component';
import {CampaignAddEditComponent} from './campaign/campaign-add-edit/campaign-add-edit.component';
import {UploadSpreadsheetComponent} from './upload-spreadsheet/upload-spreadsheet.component';
import {EmailAddEditComponent} from './email/email-add-edit/email-add-edit.component';
import {EmailListComponent} from './email/email-list/email-list.component';
import {BrandAddEditComponent} from './brands/brand-add-edit/brand-add-edit.component';
import {AddQuickCampaignComponent} from './quick-campaign/add-quick-campaign/add-quick-campaign.component';
import {QuickCampaignListComponent} from './quick-campaign/quick-campaign-list/quick-campaign-list.component';
import {DataReportComponent} from './data-report/data-report.component';
import {DataGraphComponent} from './data-graph/data-graph.component';
import {RolesListComponent} from './roles/roles-list/roles-list.component';
import {UpdateRoleComponent} from './roles/update-role/update-role.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardService} from '../services/dashboard.service';
import {ChartsModule} from 'ng2-charts';
import {CampaignService} from '../services/campaign.service';
import {CKEditorModule} from 'ckeditor4-angular';
import {BrandService} from '../services/brand.service';
import {EmailTemplateService} from '../services/email-template.service';
import {QuickCampaignService} from '../services/quick-campaign.service';
import {ReportService} from '../services/report.service';
import {RoleService} from '../services/role.service';
import {UploadService} from '../services/upload.service';
import {AccessGuard} from '../guards/access.guard';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    BrandListComponent,
    BrandAddEditComponent,
    CampaignListComponent,
    CampaignDetailComponent,
    CampaignAddEditComponent,
    UploadSpreadsheetComponent,
    EmailAddEditComponent,
    EmailListComponent,
    AddQuickCampaignComponent,
    QuickCampaignListComponent,
    DataReportComponent,
    DataGraphComponent,
    RolesListComponent,
    UpdateRoleComponent,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    NgZorroAntdModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
  ],
  providers: [
    AccessGuard,
    DashboardService,
    CampaignService,
    BrandService,
    EmailTemplateService,
    QuickCampaignService,
    ReportService,
    RoleService,
    UploadService
  ],
})
export class DashboardModule {
}
