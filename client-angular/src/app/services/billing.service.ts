import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer } from './customer.service';
import { Product } from './product.service';

export interface ProductItem {
  id?: number;
  productId: number;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Bill {
  id?: number;
  customerId: number;
  billDate?: Date;
  totalAmount?: number;
  productItems: ProductItem[];
  customer?: Customer;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  /** Spring Data REST (liste simple) */
  private readonly billsUrl =
      `${environment.gatewayUrl}/billing-service/bills`;

  /** API custom enrichie */
  private readonly apiUrl =
      `${environment.gatewayUrl}/billing-service/api/bills`;

  constructor(private http: HttpClient) {}

  // ================= LISTE =================

  getAllBills(): Observable<Bill[]> {
    return this.http.get<any>(this.billsUrl).pipe(
        map(res =>
            res._embedded?.bills?.map((b: any) => ({
              id: this.extractId(b),
              customerId: b.customerId,
              billDate: b.billingDate,
              totalAmount: b.totalAmount,
              productItems: [] // pas enrichi ici
            })) || []
        )
    );
  }

  // ================= DETAILS =================

  getBillById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }

  // ================= CRUD =================

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billsUrl, bill);
  }

  updateBill(id: number, bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.billsUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.billsUrl}/${id}`);
  }

  // ================= UTILS =================

  private extractId(entity: any): number {
    const href = entity?._links?.self?.href;
    return href ? Number(href.split('/').pop()) : 0;
  }

  saveBillWithItems(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(
        `${this.billsUrl}/complete`,
        bill
    );
  }

}


