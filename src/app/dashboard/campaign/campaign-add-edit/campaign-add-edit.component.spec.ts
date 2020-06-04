import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAddEditComponent } from './campaign-add-edit.component';

describe('CampaignAddEditComponent', () => {
  let component: CampaignAddEditComponent;
  let fixture: ComponentFixture<CampaignAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
