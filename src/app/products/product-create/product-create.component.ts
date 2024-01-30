import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../../shared/services/firestore.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private firebase = inject(FirestoreService);

  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    this.firebase.createProduct(this.productForm.value);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
