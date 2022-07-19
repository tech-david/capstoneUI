import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable, TemplateRef } from '@angular/core';
import { File } from './file';
import { FILES } from './mock-files';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private filesUrl = 'api/files';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.filesUrl)
    .pipe(
      tap(_ => this.log('fetched files')),
      catchError(this.handleError<File[]>('getFiles', []))
    );
  }

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  // GET hero by id. 404 if id not found
  getFile(id: number): Observable<File> {
    const url = `${this.filesUrl}/${id}`;
    return this.http.get<File>(url).pipe(
      tap(_ => this.log(`fetched file id=${id}`)),
      catchError(this.handleError<File>(`getFile id=${id}`))
    );
  }

  updateFile(file: File): Observable<any> {
    return this.http.put(this.filesUrl, file, this.httpOptions).pipe(
      tap(_ => this.log(`updated file id=${file.id}`)),
      catchError(this.handleError<any>('updateFile'))
    );
  }

  //POST - add new File to server
  addFile(file: File): Observable<File> {
    return this.http.post<File>(this.filesUrl, file, this.httpOptions).pipe(
      tap((newFile: File) => this.log(`added file w/ id=${newFile.id}`)),
      catchError(this.handleError<File>('addFile'))
    );
  }

  //DELETE: Delete the file from the server
  deleteFile(id: number): Observable<File> {
    const url = `${this.filesUrl}/${id}`;

    return this.http.delete<File>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted file id=${id}`)),
      catchError(this.handleError<File>('deleteFile'))
    );
  }

    //GET files by name in search term
  searchFiles(term: string): Observable<File[]>{
    if(!term.trim()) {
      return of ([]);
    }
    return this.http.get<File[]>(`${this.filesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found files matching "${term}"`) :
        this.log(`no files found matching "${term}"`)),
      catchError(this.handleError<File[]>('searchFiles', []))
      );
    }
    

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    //log to console, TODO log to logging infrastructure
    console.error(error);

    //TODO modify to better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    //Keep app running by returning empty result
    return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
