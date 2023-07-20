import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploaderService {
  uploadFile(file: File): Observable<string> {
    // Simulate the file upload process here.
    // For demonstration purposes, we'll return a mock URL representing the uploaded file.
    // In a real scenario, you might want to return actual file data or store it on the server.
    const mockUploadedUrl = 'https://example.com/mock-uploaded-file';
    return of(mockUploadedUrl);
  }
}
