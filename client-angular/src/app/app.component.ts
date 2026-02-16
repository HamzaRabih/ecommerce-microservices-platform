import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <h1>EOMMS</h1>
          <p>E-commerce Order Management System</p>
        </div>
        <ul class="navbar-menu">
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><a routerLink="/customers">Customers</a></li>
          <li><a routerLink="/products">Products</a></li>
          <li><a routerLink="/bills">Bills</a></li>
          <li><a routerLink="/config">Config</a></li>
        </ul>
      </div>
    </nav>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <p>&copy; 2026 EOMMS - Systèmes Distribués. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 28px;
    }

    .navbar-brand p {
      margin: 5px 0 0 0;
      font-size: 12px;
      opacity: 0.9;
    }

    .navbar-menu {
      list-style: none;
      display: flex;
      gap: 30px;
      margin: 0;
    }

    .navbar-menu a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s;
    }

    .navbar-menu a:hover {
      opacity: 0.8;
      text-decoration: underline;
    }

    .main-content {
      min-height: calc(100vh - 200px);
      padding: 20px 0;
    }

    .footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 40px;
    }

    .footer p {
      margin: 0;
    }
  `]
})
export class AppComponent { }
