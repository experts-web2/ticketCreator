import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  subscribe() {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  addNewTaskData(params: any) {
    console.log("PARAMS",params)
    return this.http.post('http://localhost:3030/api/ticket/add',params);
  }
}
