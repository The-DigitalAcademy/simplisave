import { Component } from '@angular/core';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.css']
})
export class Step7Component {
  selectedFile: File | null = null;

  constructor(private fileUploaderService: FileUploaderService, private userService: UserService) {}

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      this.selectedFile = inputElement.files[0];
    }
  }

  upload() {
    if (this.selectedFile) {
      this.fileUploaderService.uploadFile(this.selectedFile).subscribe(
        (uploadedUrl) => {
          // Handle the uploaded URL or any other response from the service.
          console.log('File uploaded successfully:', uploadedUrl);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

}
