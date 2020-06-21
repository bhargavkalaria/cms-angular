import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {Constant} from '../../../utils/constant';
import {BrandModel} from '../../../models/brandModel';
import {BrandService} from '../../../services/brand.service';
import {UserService} from '../../../services/user.service';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
    isLoading = true;
    brandList: BrandModel[];
    listOfDisplayData: BrandModel[];
    searchValue = '';
    visible = false;
    @ViewChild('dummyData', {static: false}) excelData: ElementRef;

    constructor(private router: Router,
                private brandService: BrandService,
                private notification: NotificationService,
                public userService: UserService) {
    }


    ngOnInit(): void {
        this.brandService.getBrands().then((result: any) => {
            this.brandList = result;
            this.listOfDisplayData = [...this.brandList];
            this.isLoading = false;
        }).catch(error => {
            this.notification.createNotification(this.notification.notificationError,
                Constant.ErrorShortMessage, Constant.somethingWentWrong);
        });
    }

    Add(): void {
        this.router.navigate(['dashboard/brand-list/create']);
    }

    Edit(item: BrandModel): void {
        this.router.navigate(['dashboard/brand-list/edit/', item.BrandId]);
    }

    delete(item: BrandModel): void {
        this.brandService.Delete(item.BrandId).then((res: any) => {
            this.notification.createNotification(
                this.notification.notificationSuccess,
                Constant.brandDeleteSuccessShortMessage, res);
            this.ngOnInit();
        }).catch((error: any) => {
            console.log(error);
        });
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }

    search(): void {
        this.visible = false;
        this.listOfDisplayData = this.brandList.filter((item) => item.BrandName.toLowerCase().indexOf(this.searchValue) !== -1);
    }

    downloadPDF() {
        const doc = new jsPDF();
        const col = ['Sr no', 'Brand Name'];
        const rows = [];

        this.listOfDisplayData.forEach((element, index) => {
            const innerRows = [];
            innerRows.push(index + 1);
            innerRows.push(element.BrandName);
            rows.push(innerRows);
        });

        doc.autoTable(col, rows);
        doc.save('Brands.pdf');
    }

    downloadExcel() {
        const ws: XLSX.WorkSheet =
            XLSX.utils.table_to_sheet(this.excelData.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customers');
        XLSX.writeFile(wb, 'Brands.xlsx');
    }
}
