import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Product } from '../product';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private firebase = inject(FirestoreService);
  productName = 'Product';

  product!: Product;
  productForm!: FormGroup;
  formSubmitted = false;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
    });

    Notiflix.Loading.dots();
    const id = this.route.snapshot.paramMap.get('id');
    this.firebase.getProduct(String(id)).then((item) => {
      this.product = item as Product;
      this.productName = this.product.name;

      // Set edit form default value
      this.productForm.get('name')?.setValue(this.product.name);
      this.productForm.get('category')?.setValue(this.product.category);
      this.productForm.get('price')?.setValue(this.product.price);
      this.productForm.get('description')?.setValue(this.product.description);
      Notiflix.Loading.remove();
    });
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.firebase.updateProduct(String(id), this.productForm.value);

    this.formSubmitted = true;
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
