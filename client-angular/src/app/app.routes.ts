import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { BillListComponent } from './components/bills/bill-list/bill-list.component';
import { BillFormComponent } from './components/bills/bill-form/bill-form.component';
import { BillDetailComponent } from './components/bills/bill-detail/bill-detail.component';
import { ConfigComponent } from './components/config/config.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
  
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  
  { path: 'bills', component: BillListComponent },
  { path: 'bills/new', component: BillFormComponent },
  { path: 'bills/edit/:id', component: BillFormComponent },
  { path: 'bills/:id', component: BillDetailComponent },
  
  { path: 'config', component: ConfigComponent },
  
  { path: '**', redirectTo: '/dashboard' }
];
