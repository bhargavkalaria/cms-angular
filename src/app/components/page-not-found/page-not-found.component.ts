import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="unauthorize">
      <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
        <div nz-result-extra>
          <button nz-button nzType="primary" routerLink="../dashboard">Back Home</button>
        </div>
      </nz-result>
    </div>`,
})
export class PageNotFoundComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
