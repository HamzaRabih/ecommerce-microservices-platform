import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from '../../services/product.service';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Dashboard</h1>
      <p>Welcome to EOMMS - E-commerce Order Management System</p>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Customers</h3>
          <p class="stat-value">{{ totalCustomers }}</p>
          <p class="stat-label">Active Customers</p>
        </div>

        <div class="stat-card">
          <h3>Total Products</h3>
          <p class="stat-value">{{ totalProducts }}</p>
          <p class="stat-label">In Inventory</p>
        </div>

        <div class="stat-card">
          <h3>Total Bills</h3>
          <p class="stat-value">{{ totalBills }}</p>
          <p class="stat-label">Orders Processed</p>
        </div>

        <div class="stat-card">
          <h3>System Status</h3>
          <p class="stat-value status-active">ACTIVE</p>
          <p class="stat-label">All Services Online</p>
        </div>
      </div>

      <div class="info-section">
        <h2>Quick Actions</h2>
        <ul class="quick-actions">
          <li><a href="/customers/new">Add New Customer</a></li>
          <li><a href="/products/new">Add New Product</a></li>
          <li><a href="/bills/new">Create New Bill</a></li>
          <li><a href="/customers">Manage Customers</a></li>
          <li><a href="/products">Manage Products</a></li>
          <li><a href="/bills">View Bills</a></li>
        </ul>
      </div>

      <div class="info-section">
        <h2>System Information</h2>
        <ul class="info-list">
          <li><strong>Service Architecture:</strong> Microservices with Spring Cloud</li>
          <li><strong>Discovery:</strong> Eureka Service Discovery</li>
          <li><strong>Configuration:</strong> Centralized Config Server</li>
          <li><strong>API Gateway:</strong> Spring Cloud Gateway</li>
          <li><strong>Frontend:</strong> Angular 17</li>
          <li><strong>Communication:</strong> RESTful APIs</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      font-size: 32px;
      margin-bottom: 10px;
      color: #333;
    }

    > p {
      color: #666;
      margin-bottom: 30px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .stat-card h3 {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #667eea;
      margin: 10px 0;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
      margin: 0;
    }

    .status-active {
      color: #28a745;
    }

    .info-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .info-section h2 {
      font-size: 20px;
      margin-bottom: 15px;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }

    .quick-actions {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }

    .quick-actions li a {
      display: block;
      padding: 12px 15px;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      text-decoration: none;
      color: #667eea;
      font-weight: 500;
      transition: all 0.3s ease;
      text-align: center;
    }

    .quick-actions li a:hover {
      background-color: #667eea;
      color: white;
      transform: translateX(5px);
    }

    .info-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .info-list li {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .info-list li:last-child {
      border-bottom: none;
    }

    .info-list strong {
      color: #667eea;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalCustomers = 0;
  totalProducts = 0;
  totalBills = 0;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private billingService: BillingService
  ) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;
      },
      error: () => {
        console.log('Customer service unavailable');
      }
    });

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
      },
      error: () => {
        console.log('Product service unavailable');
      }
    });

    this.billingService.getAllBills().subscribe({
      next: (bills) => {
        this.totalBills = bills.length;
      },
      error: () => {
        console.log('Billing service unavailable');
      }
    });
  }
}
