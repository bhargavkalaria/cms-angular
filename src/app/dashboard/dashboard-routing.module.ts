import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {BrandListComponent} from './brands/brand-list/brand-list.component';
import {CampaignListComponent} from './campaign/campaign-list/campaign-list.component';
import {CampaignAddEditComponent} from './campaign/campaign-add-edit/campaign-add-edit.component';
import {CampaignDetailComponent} from './campaign/campaign-detail/campaign-detail.component';
import {DataReportComponent} from './data-report/data-report.component';
import {DataGraphComponent} from './data-graph/data-graph.component';
import {BrandAddEditComponent} from './brands/brand-add-edit/brand-add-edit.component';
import {EmailListComponent} from './email/email-list/email-list.component';
import {EmailAddEditComponent} from './email/email-add-edit/email-add-edit.component';
import {QuickCampaignListComponent} from './quick-campaign/quick-campaign-list/quick-campaign-list.component';
import {AddQuickCampaignComponent} from './quick-campaign/add-quick-campaign/add-quick-campaign.component';
import {UpdateRoleComponent} from './roles/update-role/update-role.component';
import {RolesListComponent} from './roles/roles-list/roles-list.component';
import {UploadSpreadsheetComponent} from './upload-spreadsheet/upload-spreadsheet.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'brand-list',
        component: BrandListComponent
      },
      {
        path: 'brand',
        component: BrandAddEditComponent
      },
      {
        path: 'brand-list/edit/:id',
        component: BrandAddEditComponent
      },
      {
        path: 'campaign',
        component: CampaignListComponent
      },
      {
        path: 'campaign/create',
        component: CampaignAddEditComponent
      },
      {
        path: 'campaign/edit/:id',
        component: CampaignAddEditComponent
      },
      {
        path: 'campaign-list/detail/:id',
        component: CampaignDetailComponent
      },
      {
        path: 'report',
        component: DataReportComponent
      },
      {
        path: 'graph',
        component: DataGraphComponent
      },
      {
        path: 'email-template',
        component: EmailListComponent
      },
      {
        path: 'email-template/create',
        component: EmailAddEditComponent
      },
      {
        path: 'email-template/edit/:id',
        component: EmailAddEditComponent
      },
      {
        path: 'quick-campaign-list',
        component: QuickCampaignListComponent
      },
      {
        path: 'add-quick-campaign',
        component: AddQuickCampaignComponent
      },
      {
        path: 'update-role/:id',
        component: UpdateRoleComponent
      },
      {
        path: 'roles-list',
        component: RolesListComponent
      },
      {
        path: 'upload-spreadsheet',
        component: UploadSpreadsheetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
