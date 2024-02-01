import { Component, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Product, Review } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private firebase = inject(FirestoreService);
  private auth = inject(AuthService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  product!: Product;
  review!: Review;
  reviewInit = { productId: '', username: '', message: '' };
  ratings = 0;
  isWriting = false;

  ngOnInit(): void {
    this.review = this.reviewInit;

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.firebase.getProduct(id).then((item) => {
        // console.log(item);
        this.product = item as Product;
      });
    }
  }

  isAuth() {
    return this.auth.isLoggedIn();
  }

  onSubmit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const currentUser = this.auth.getAuthLocal();
    const reviewData: Review = {
      ...this.review,
      productId: id,
      username: String(currentUser.displayName),
      photoUrl: String(currentUser.photoURL),
      ratings: this.ratings,
    };
    // console.log('Submit data: ', reviewData);

    this.firebase.createReview(reviewData).then(() => {
      this.firebase.getProduct(id).then((item) => {
        this.product = item as Product;
        this.isWriting = false;
        this.review = this.reviewInit;
        Notiflix.Notify.success('Review made successfully.');
      });
    });
  }

  refectData(id: string) {
    this.firebase.getProduct(id).then((item) => {
      this.product = item as Product;
    });
  }

  toggleWritingMode() {
    this.isWriting = !this.isWriting;
  }

  setRating(rating: number) {
    if (this.ratings == rating) {
      this.ratings = 0;
    } else {
      this.ratings = rating;
    }
  }

  isRated(rating: number) {
    return rating <= this.ratings
      ? 'fill-yellow-500 hover:cursor-pointer'
      : 'fill-white hover:cursor-pointer';
  }

  addToCart(product: Product): void {
    this.cartService.updateCart(product);
  }
}
