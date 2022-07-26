import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpRequest: HttpClient) {}

  newTicket(ticket: any) {
    return this.httpRequest.post(
      'http://ec2-18-237-217-59.us-west-2.compute.amazonaws.com:3030/api/ticket/add',
      ticket
    );
  }

  ticketList() {
    return this.httpRequest.get(
      'http://ec2-18-237-217-59.us-west-2.compute.amazonaws.com:3030/api/ticket/list'
    );
  }
}
