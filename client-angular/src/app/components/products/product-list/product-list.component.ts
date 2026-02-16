import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
 templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  searchTerm = '';
  message = '';
  messageType = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
        this.message = 'Error loading products';
        this.messageType = 'error';
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error searching products:', error);
        }
      });
    } else {
      this.loadProducts();
    }
  }

  deleteProduct(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.message = 'Product deleted successfully';
          this.messageType = 'success';
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.message = 'Error deleting product';
          this.messageType = 'error';
        }
      });
    }
  }
}
