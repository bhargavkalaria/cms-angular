import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UploadService} from '../../services/upload.service';
import * as XLSX from 'xlsx';
import {CustomerModel} from '../../models/customerModel';
import {NotificationService} from '../../services/notification.service';
import {Constant} from '../../utils/constant';

@Component({
    selector: 'app-upload-spreadsheet',
    templateUrl: './upload-spreadsheet.component.html',
    styleUrls: ['./upload-spreadsheet.component.scss']
})
export class UploadSpreadsheetComponent implements OnInit {
    file: File;
    arrayBuffer: any;
    @ViewChild('dummyData', {static: false}) dummyData: ElementRef;

    constructor(private uploadService: UploadService,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    uploadFile(event) {
        this.file = event.target.files[0];
        if (this.file.name.indexOf('.xlsx') > 1) {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(this.file);
            fileReader.onload = (e) => {
                this.arrayBuffer = fileReader.result;
                const data = new Uint8Array(this.arrayBuffer);
                const arr = [];
                for (let i = 0; i !== data.length; ++i) {
                    arr[i] = String.fromCharCode(data[i]);
                }
                const bStr = arr.join('');
                const workbook = XLSX.read(bStr, {type: 'binary'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const arrayList: CustomerModel[] = XLSX.utils.sheet_to_json(worksheet, {raw: true});
                const tmp = this.validateCustomerData(arrayList);
                if (tmp) {
                    this.addCustomer(arrayList);
                }
            };
        } else {
            this.notificationService.createNotification(
                this.notificationService.notificationError,
                Constant.fileFormatError,
                Constant.fileFormatErrorDescription
            );
        }
    }

    validateCustomerData(customerData: CustomerModel[]) {
        return customerData.every((customer: CustomerModel, index) => {
            if (customer.CustomerName) {
                if (!this.isNumber(customer.CustomerName)) {
                    this.notificationService.createNotification(
                        this.notificationService.notificationError,
                        Constant.uploadFailText,
                        Constant.uploadCustomerFormatError + (index + 2)
                    );
                    return false;
                }
            } else {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadCustomerEmptyError + (index + 2)
                );
                return false;
            }
            if (customer.Email) {
                if (this.isEmail(customer.Email)) {
                    this.notificationService.createNotification(
                        this.notificationService.notificationError,
                        Constant.uploadFailText,
                        Constant.uploadEmailFormatError + (index + 2)
                    );
                    return false;
                }
            } else {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadEmailEmptyError + (index + 2)
                );
                return false;
            }
            if (!customer.City) {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadCityEmptyError + (index + 2)
                );
                return false;
            }
            if (customer.Mobile) {
                if (!this.isMobile(customer.Mobile)) {
                    this.notificationService.createNotification(
                        this.notificationService.notificationError,
                        Constant.uploadFailText,
                        Constant.uploadMobileFormatError + (index + 2)
                    );
                    return false;
                }
            } else {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadMobileEmptyError + (index + 2)
                );
                return false;
            }
            if (customer.Age) {
                if (!this.isAge(customer.Age)) {
                    this.notificationService.createNotification(
                        this.notificationService.notificationError,
                        Constant.uploadFailText,
                        Constant.uploadAgeFormatError + (index + 2)
                    );
                    return false;
                }
            } else {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadAgeEmptyError + (index + 2)
                );
                return false;
            }
            if (!customer.State) {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadStateEmptyError + (index + 2)
                );
                return false;
            }
            if (!customer.Country) {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadCountryEmptyError + (index + 2)
                );
                return false;
            }
            if (!customer.Address) {
                this.notificationService.createNotification(
                    this.notificationService.notificationError,
                    Constant.uploadFailText,
                    Constant.uploadAddressEmptyError + (index + 2)
                );
                return false;
            }
            return true;
        });
    }

    isNumber(name) {
        const numberRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        return numberRegex.test(name);
    }

    isEmail(email) {
        const emailRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        return emailRegex.test(email);
    }

    isMobile(phone) {
        const phoneRegex = /^(\d{10})$/;
        return phoneRegex.test(phone);
    }

    isAge(age) {
        const ageRegex = /^0*(?:[1-9][0-9]?|100)$/;
        return ageRegex.test(age);
    }

    addCustomer(customerList) {
        this.uploadService.uploadExcel(customerList).then(result => {
            this.notificationService.createNotification(
                this.notificationService.notificationSuccess,
                Constant.uploadSuccess,
                Constant.uploadSuccessDetails
            );
        }).catch(error => {
            this.notificationService.createNotification(
                this.notificationService.notificationError,
                Constant.uploadFailText,
                Constant.uploadErrorFail
            );
        });
    }

    exportToExcel() {
        const ws: XLSX.WorkSheet =
            XLSX.utils.table_to_sheet(this.dummyData.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customers');
        XLSX.writeFile(wb, 'Customer format.xlsx');
    }
}
