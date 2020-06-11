import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-upload-spreadsheet',
  templateUrl: './upload-spreadsheet.component.html',
  styleUrls: ['./upload-spreadsheet.component.scss']
})
export class UploadSpreadsheetComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  constructor(private uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('upload', this.fileInput.nativeElement.files[0]);
    console.log(formData);
    this.uploadService.UploadExcel(formData).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });

  }
}
