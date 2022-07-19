import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const files = [
      { id: 12, name: 'File' },
      { id: 13, name: 'Another File' },
      { id: 14, name: 'Now this file' },
      { id: 15, name: 'Moar file' },
      { id: 16, name: 'So much fio' },
      { id: 17, name: 'Had enough file' },
      { id: 18, name: 'Heres more file' },
      { id: 19, name: 'Enough file' },
      { id: 20, name: 'Done file' }
    ];
    return {files};
  }

  genId(files: File[]): number {
    return files.length > 0 ? Math.max(...files.map(file => file.id)) + 1 : 11;
  }

  constructor() { }
}
