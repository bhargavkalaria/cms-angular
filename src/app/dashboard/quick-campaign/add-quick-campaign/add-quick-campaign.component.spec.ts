import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuickCampaignComponent } from './add-quick-campaign.component';

describe('AddQuickCampaignComponent', () => {
  let component: AddQuickCampaignComponent;
  let fixture: ComponentFixture<AddQuickCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuickCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuickCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
