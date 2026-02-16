import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ConfigProperty {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly baseUrl =
      `${environment.gatewayUrl}/config-service/api/config`;

  constructor(private http: HttpClient) {}

  getConfig(): Observable<ConfigProperty[]> {
    return this.http.get<ConfigProperty[]>(`${this.baseUrl}/properties`);
  }

  getConfigProperty(key: string): Observable<string> {
    return this.http.get<string>(
        `${this.baseUrl}/property/${encodeURIComponent(key)}`
    );
  }

  refreshConfig(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/refresh`, {});
  }

  getHealthStatus(): Observable<any> {
    return this.http.get<any>(
        `${environment.gatewayUrl}/config-service/actuator/health`
    );
  }
}
