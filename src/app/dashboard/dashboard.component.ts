import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { File } from '../file'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files: File[] = [];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles()
    .subscribe(files => this.files = files.slice(1,5));
  }

}
