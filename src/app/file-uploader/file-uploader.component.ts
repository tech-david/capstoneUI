import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  files: File[] = [];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles()
      .subscribe(files => this.files = files);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {
      return;
    }
    this.fileService.addFile({ name } as File)
    .subscribe(file => {
      this.files.push(file);
    });
  }

  delete(file: File): void{
    this.files = this.files.filter(f => f !== file);
    this.fileService.deleteFile(file.id).subscribe();
  }

}
