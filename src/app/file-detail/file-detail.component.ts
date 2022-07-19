import { Component, OnInit, Input } from '@angular/core';
import { File } from '../file';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  file: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getFile();
  }

  getFile(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fileService.getFile(id)
      .subscribe(file => this.file = file);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.file) {
      this.fileService.updateFile(this.file)
        .subscribe(() => this.goBack);
    }
  }

}
