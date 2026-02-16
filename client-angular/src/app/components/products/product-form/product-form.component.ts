import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, quantity: 0 };
  editMode = false;
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loading = true;
      this.productService.getProductById(Number(id)).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.loading = false;
          this.message = 'Error loading product';
          this.messageType = 'error';
        }
      });
    }
  }

  saveProduct(): void {
    if (!this.product.name || this.product.price <= 0 || this.product.quantity < 0) {
      this.message = 'Please fill in all required fields with valid values';
      this.messageType = 'error';
      return;
    }

    this.loading = true;
    const request = this.editMode
      ? this.productService.updateProduct(this.product.id!, this.product)
      : this.productService.createProduct(this.product);

    request.subscribe({
      next: () => {
        this.message = this.editMode ? 'Product updated successfully' : 'Product created successfully';
        this.messageType = 'success';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error saving product:', error);
        this.message = 'Error saving product';
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }
}
