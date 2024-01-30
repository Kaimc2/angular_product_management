import { Component, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private firebase = inject(FirestoreService);
  private route = inject(ActivatedRoute);

  product!: Product;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.firebase.getProduct(id).then((item) => {
        if (item) {
          this.product = item;
        }
      });
    }
  }
}
