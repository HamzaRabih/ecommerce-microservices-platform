import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BillingService, Bill, ProductItem } from '../../../services/billing.service';
import { CustomerService, Customer } from '../../../services/customer.service';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-bill-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl : './bill-form.component.html',
    styleUrl: './bill-form.component.css'
})
export class BillFormComponent implements OnInit {
  bill: Bill = { customerId: null as any, productItems: [] };
  customers: Customer[] = [];
  products: Product[] = [];
  selectedProductId: number | null = null;
  selectedQuantity = 1;
  editMode = false;
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private billingService: BillingService,
    private customerService: CustomerService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loading = true;
      this.billingService.getBillById(Number(id)).subscribe({
        next: (data) => {
          this.bill = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading bill:', error);
          this.loading = false;
          this.message = 'Error loading bill';
          this.messageType = 'error';
        }
      });
    }
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  addProductToBill(): void {
    if (!this.selectedProductId || this.selectedQuantity <= 0) {
      this.message = 'Please select a product and quantity';
      this.messageType = 'error';
      return;
    }

    const product = this.products.find(p => p.id === this.selectedProductId);
    if (!product) {
      return;
    }

    const existingItem = this.bill.productItems.find(pi => pi.productId === this.selectedProductId);
    if (existingItem) {
      existingItem.quantity += this.selectedQuantity;
    } else {
      this.bill.productItems.push({
        productId: this.selectedProductId,
        quantity: this.selectedQuantity,
        price: product.price,
        product: product
      });
    }

    this.calculateTotal();
    this.selectedProductId = null;
    this.selectedQuantity = 1;
  }

  removeProductFromBill(index: number): void {
    this.bill.productItems.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.bill.totalAmount = this.bill.productItems.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0);
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  }

  saveBill(): void {
    if (!this.bill.customerId) {
      this.message = 'Please select a customer';
      this.messageType = 'error';
      return;
    }

    if (!this.bill.productItems || this.bill.productItems.length === 0) {
      this.message = 'Please add at least one product';
      this.messageType = 'error';
      return;
    }

    this.loading = true;
    const request = this.editMode
      ? this.billingService.updateBill(this.bill.id!, this.bill)
      : this.billingService.createBill(this.bill);

    request.subscribe({
      next: () => {
        this.message = this.editMode ? 'Bill updated successfully' : 'Bill created successfully';
        this.messageType = 'success';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/bills']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error saving bill:', error);
        this.message = 'Error saving bill';
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }
}
