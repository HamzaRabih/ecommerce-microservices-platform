import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  searchTerm = '';
  message = '';
  messageType = '';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        console.log(this.customers)
        console.log(data)
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.loading = false;
        this.message = 'Error loading customers';
        this.messageType = 'error';
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.customerService.searchCustomers(this.searchTerm).subscribe({
        next: (data) => {
          console.log("Search results:")
          console.log(data)
          this.customers = data;
        },
        error: (error) => {
          console.error('Error searching customers:', error);
        }
      });
    } else {
      this.loadCustomers();
    }
  }

  deleteCustomer(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.message = 'Customer deleted successfully';
          this.messageType = 'success';
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
          this.message = 'Error deleting customer';
          this.messageType = 'error';
        }
      });
    }
  }
}
