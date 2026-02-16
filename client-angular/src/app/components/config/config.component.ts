import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>System Configuration</h1>

      <div class="grid">
        <div class="config-card">
          <h2>Health Status</h2>
          <div class="status-item">
            <span>Config Service:</span>
            <span class="badge" [ngClass]="{'badge-success': configHealth, 'badge-danger': !configHealth}">
              {{ configHealth ? 'ACTIVE' : 'INACTIVE' }}
            </span>
          </div>
          <button (click)="checkHealth()" class="btn btn-primary" [disabled]="loadingHealth">
            {{ loadingHealth ? 'Checking...' : 'Check Health' }}
          </button>
        </div>

        <div class="config-card">
          <h2>Configuration Properties</h2>
          <p>Current system configuration parameters</p>
          <button (click)="loadConfig()" class="btn btn-primary" [disabled]="loadingConfig">
            {{ loadingConfig ? 'Loading...' : 'Load Configuration' }}
          </button>
        </div>

        <div class="config-card">
          <h2>Microservices Status</h2>
          <ul class="service-list">
            <li>
              <span>Customer Service (8081)</span>
              <span class="badge badge-success">Online</span>
            </li>
            <li>
              <span>Inventory Service (8082)</span>
              <span class="badge badge-success">Online</span>
            </li>
            <li>
              <span>Billing Service (8083)</span>
              <span class="badge badge-success">Online</span>
            </li>
            <li>
              <span>Config Service (8084)</span>
              <span class="badge badge-success">Online</span>
            </li>
            <li>
              <span>Discovery Service - Eureka (8761)</span>
              <span class="badge badge-success">Online</span>
            </li>
            <li>
              <span>Gateway Service (8080)</span>
              <span class="badge badge-success">Online</span>
            </li>
          </ul>
        </div>
      </div>

      <div *ngIf="config" class="card config-display">
        <h2>Active Configuration</h2>
        <div class="config-content">
          <pre>{{ config | json }}</pre>
        </div>
      </div>

      <div class="card info-section">
        <h2>System Architecture</h2>
        <div class="architecture-info">
          <div class="component">
            <h3>API Gateway</h3>
            <p>Spring Cloud Gateway at port 8080</p>
            <p class="details">Routes requests to all microservices</p>
          </div>
          
          <div class="component">
            <h3>Service Discovery</h3>
            <p>Eureka Server at port 8761</p>
            <p class="details">Manages service registration and discovery</p>
          </div>

          <div class="component">
            <h3>Config Server</h3>
            <p>Centralized Config at port 8084</p>
            <p class="details">Manages configuration properties for all services</p>
          </div>

          <div class="component">
            <h3>Customer Service</h3>
            <p>REST API at port 8081</p>
            <p class="details">Manages customer data and operations</p>
          </div>

          <div class="component">
            <h3>Inventory Service</h3>
            <p>REST API at port 8082</p>
            <p class="details">Manages product inventory</p>
          </div>

          <div class="component">
            <h3>Billing Service</h3>
            <p>REST API at port 8083</p>
            <p class="details">Handles billing and orders</p>
          </div>

          <div class="component">
            <h3>Angular Client</h3>
            <p>Frontend at port 4200</p>
            <p class="details">User interface for the system</p>
          </div>
        </div>
      </div>

      <div *ngIf="message" [ngClass]="'alert alert-' + messageType">
        {{ message }}
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .config-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .config-card h2 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #333;
    }

    .config-card p {
      color: #666;
      margin-bottom: 15px;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      margin-bottom: 15px;
    }

    .service-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .service-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .service-list li:last-child {
      border-bottom: none;
    }

    .badge {
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: 500;
    }

    .badge-success {
      background-color: #d4edda;
      color: #155724;
    }

    .badge-danger {
      background-color: #f8d7da;
      color: #721c24;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background-color: #667eea;
      color: white;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .btn:hover:not(:disabled) {
      background-color: #5568d3;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .config-display {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 20px 0;
    }

    .config-display h2 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #333;
    }

    .config-content {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
    }

    .config-content pre {
      margin: 0;
      font-size: 12px;
      color: #333;
    }

    .info-section {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 20px 0;
    }

    .info-section h2 {
      font-size: 20px;
      margin-bottom: 20px;
      color: #333;
    }

    .architecture-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .component {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    .component:hover {
      transform: translateY(-5px);
    }

    .component h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .component p {
      margin: 5px 0;
      font-size: 14px;
    }

    .component .details {
      opacity: 0.9;
      font-size: 12px;
    }

    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 20px;
    }

    .alert {
      padding: 12px 20px;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .alert-success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .alert-error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  `]
})
export class ConfigComponent implements OnInit {
  config: any = null;
  configHealth = false;
  loadingConfig = false;
  loadingHealth = false;
  message = '';
  messageType = '';

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.checkHealth();
  }

  loadConfig(): void {
    this.loadingConfig = true;
    this.configService.getConfig().subscribe({
      next: (data) => {
        this.config = data;
        this.loadingConfig = false;
        this.message = 'Configuration loaded successfully';
        this.messageType = 'success';
      },
      error: (error) => {
        console.error('Error loading config:', error);
        this.loadingConfig = false;
        this.message = 'Error loading configuration';
        this.messageType = 'error';
      }
    });
  }

  checkHealth(): void {
    this.loadingHealth = true;
    this.configService.getHealthStatus().subscribe({
      next: (data) => {
        this.configHealth = data.status === 'UP';
        this.loadingHealth = false;
      },
      error: (error) => {
        console.error('Error checking health:', error);
        this.configHealth = false;
        this.loadingHealth = false;
      }
    });
  }
}
