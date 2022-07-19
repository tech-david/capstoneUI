import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { File } from '../file';
import { FileService  } from '../file.service';

@Component({
  selector: 'app-file-search',
  templateUrl: './file-search.component.html',
  styleUrls: ['./file-search.component.css']
})
export class FileSearchComponent implements OnInit {
  files$!: Observable<File[]>;
  private searchTerms = new Subject<string>();

  constructor(private fileService: FileService) { }

  //Push search term in observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.files$ = this.searchTerms.pipe(
      //wait 300ms before considering term
      debounceTime(300),
      //ignore new term if same as previous
      distinctUntilChanged(),
      //swithce to new search observable each time term changes
      switchMap((term: string) => this.fileService.searchFiles(term)),
    );
  }

}
