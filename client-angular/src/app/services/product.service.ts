import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl =
      `${environment.gatewayUrl}/inventory-service/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<any>(this.baseUrl).pipe(
        map(res =>
            res._embedded?.products.map((c: any) => ({
              id: this.extractId(c),
              name: c.name,
              price: c.price,
                quantity: c.quantity
            })) || []
        )
    );
  }

  private extractId(product: any): number {
    const href = product._links.self.href;
    return Number(href.substring(href.lastIndexOf('/') + 1));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
        map(res => ({
          id: this.extractId(res),
          name: res.name,
          price: res.price,
            quantity: res.quantity
        }))
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchProducts(name: string): Observable<Product[]> {
    return this.http.get<any>(
        `${this.baseUrl}/search/findByNameContainsIgnoreCase?name=${encodeURIComponent(name)}`
    ) .pipe(
        map(res =>
            res._embedded?.products.map((c: any) => ({
              id: this.extractId(c),
              name: c.name,
              price:c.price,
                quantity: c.quantity
            })) || []
        )
    );
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
        `${this.baseUrl}/available`
    );
  }
}
