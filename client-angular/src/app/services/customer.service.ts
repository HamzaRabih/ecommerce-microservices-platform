import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '../../environments/environment';

export interface Customer {
  id?: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseUrl =
      `${environment.gatewayUrl}/customer-service/customers`;

  constructor(private http: HttpClient) {}

  //  getAllCustomers(): Observable<Customer[]> {
  //   return this.http.get<any>(this.baseUrl).pipe(
  //       map(res => res._embedded?.customers || [])
  //   );
  // }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<any>(this.baseUrl).pipe(
        map(res =>
            res._embedded?.customers.map((c: any) => ({
              id: this.extractId(c),
              name: c.name,
              email: c.email
            })) || []
        )
    );
  }
  private extractId(customer: any): number {
    const href = customer._links.self.href;
    return Number(href.substring(href.lastIndexOf('/') + 1));
  }


  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`).pipe(
        map(res => ({
          id: this.extractId(res),
          name: res.name,
          email: res.email
        }))
    );
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchCustomers(name: string): Observable<Customer[]> {
    return this.http.get<any>(
        `${this.baseUrl}/search/findByNameContainsIgnoreCase?name=${encodeURIComponent(name)}`
    ).pipe(
        map(res =>
            res._embedded?.customers.map((c: any) => ({
                id: this.extractId(c),
                name: c.name,
                email: c.email
            })) || []
        )
    );
  }
}
