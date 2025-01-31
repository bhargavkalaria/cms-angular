import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-unauthorize',
  template: `
    <div class="unauthorize">
      <nz-result nzStatus="403" nzTitle="403" nzSubTitle="Sorry, you are not authorized to access this page.">
        <div nz-result-extra>
          <button nz-button nzType="primary" routerLink="../dashboard">Back Home</button>
        </div>
      </nz-result>
    </div>
  `,
})
export class UnauthorizeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
