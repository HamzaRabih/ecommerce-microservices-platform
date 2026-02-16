import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BillingService, Bill } from '../../../services/billing.service';

@Component({
  selector: 'app-bill-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl : './bill-detail.component.html',
    styleUrl: './bill-detail.component.css'
})
export class BillDetailComponent implements OnInit {
  bill: Bill | null = null;
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private billingService: BillingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.billingService.getBillById(Number(id)).subscribe({
        next: (data) => {
          this.bill = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading bill:', error);
          this.loading = false;
          this.message = 'Error loading bill details';
          this.messageType = 'error';
        }
      });
    }
  }

  getTotalAmount(bill: Bill): number {
    return bill.productItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
  }

}
