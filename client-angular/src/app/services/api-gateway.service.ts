import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiGatewayService {

    private gateway = environment.gatewayUrl;

    constructor() {}

    customerService(path: string = ''): string {
        return `${this.gateway}/customer-service${path}`;
    }

    inventoryService(path: string = ''): string {
        return `${this.gateway}/inventory-service${path}`;
    }

    billingService(path: string = ''): string {
        return `${this.gateway}/billing-service${path}`;
    }

    configService(path: string = ''): string {
        return `${this.gateway}/config-service${path}`;
    }
}
