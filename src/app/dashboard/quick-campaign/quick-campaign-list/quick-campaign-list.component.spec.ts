import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCampaignListComponent } from './quick-campaign-list.component';

describe('QuickCampaignListComponent', () => {
  let component: QuickCampaignListComponent;
  let fixture: ComponentFixture<QuickCampaignListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCampaignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
