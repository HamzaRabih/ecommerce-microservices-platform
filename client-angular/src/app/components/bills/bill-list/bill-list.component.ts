import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BillingService, Bill } from '../../../services/billing.service';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './bill-list.component.html',
    styleUrl: './bill-list.component.css'
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  loading = false;
  message = '';
  messageType = '';

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.loading = true;
    this.billingService.getAllBills().subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bills:', error);
        this.loading = false;
        this.message = 'Error loading bills';
        this.messageType = 'error';
      }
    });
  }

  deleteBill(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this bill?')) {
      this.billingService.deleteBill(id).subscribe({
        next: () => {
          this.message = 'Bill deleted successfully';
          this.messageType = 'success';
          this.loadBills();
        },
        error: (error) => {
          console.error('Error deleting bill:', error);
          this.message = 'Error deleting bill';
          this.messageType = 'error';
        }
      });
    }
  }

  getTotalAmount(bill: Bill): number {
    console.log(bill)
    return bill.productItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
  }

}
