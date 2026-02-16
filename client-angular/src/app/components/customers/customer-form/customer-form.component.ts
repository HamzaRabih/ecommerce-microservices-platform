import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = { name: '', email: '' };
  editMode = false;
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loading = true;
      this.customerService.getCustomerById(Number(id)).subscribe({
        next: (data) => {
          this.customer = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading customer:', error);
          this.loading = false;
          this.message = 'Error loading customer';
          this.messageType = 'error';
        }
      });
    }
  }

  saveCustomer(): void {
    if (!this.customer.name || !this.customer.email) {
      this.message = 'Please fill in all required fields';
      this.messageType = 'error';
      return;
    }
    console.log(this.customer)
    this.loading = true;
    const request = this.editMode
      ? this.customerService.updateCustomer(this.customer.id!, this.customer)
      : this.customerService.createCustomer(this.customer);

    request.subscribe({
      next: () => {
        this.message = this.editMode ? 'Customer updated successfully' : 'Customer created successfully';
        this.messageType = 'success';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/customers']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error saving customer:', error);
        this.message = 'Error saving customer';
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }
}
