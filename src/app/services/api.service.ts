import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpRequest: HttpClient) {}

  newTicket(ticket: any) {
    return this.httpRequest.post(
      'http://localhost:3030/api/ticket/add',
      ticket
    );
  }
}
